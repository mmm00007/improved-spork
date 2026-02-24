import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { ErrorBoundary } from '../shared/components/ErrorBoundary';

function AppShell() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}

const rootRoute = createRootRoute({
  component: AppShell
});

const exerciseListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/exercise/list',
  component: () => <h1>Exercise / List</h1>
});

const setLoggerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/set-logger',
  component: () => <h1>Set Logger</h1>
});

const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: () => <h1>History</h1>
});

const statsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stats',
  component: () => <h1>Stats</h1>
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: () => <h1>Settings</h1>
});

const routeTree = rootRoute.addChildren([
  exerciseListRoute,
  setLoggerRoute,
  historyRoute,
  statsRoute,
  settingsRoute
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
});

export type AppRouter = typeof router;
