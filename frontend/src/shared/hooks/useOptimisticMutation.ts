import { useMutation, useQueryClient, type QueryKey } from '@tanstack/react-query';

export function useOptimisticMutation<TData, TVariables, TContext>(
  queryKey: QueryKey,
  mutationFn: (variables: TVariables) => Promise<TData>,
  optimisticUpdater: (previous: TData | undefined, variables: TVariables) => TData
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables, { previous: TData | undefined } & TContext>({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<TData>(queryKey);
      queryClient.setQueryData<TData>(queryKey, (old) => optimisticUpdater(old, variables));
      return { previous } as { previous: TData | undefined } & TContext;
    },
    onError: (_error, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey });
    }
  });
}
