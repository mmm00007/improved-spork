import { Component, type ErrorInfo, type ReactNode } from 'react';
import { logError } from '../observability/logger';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    logError('ui.error_boundary', error, { componentStack: info.componentStack });
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return <p>Something went wrong. Please reload.</p>;
    }

    return this.props.children;
  }
}
