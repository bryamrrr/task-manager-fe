import { Route, Redirect } from 'react-router-dom';

interface PublicRouteProps {
  isAuthenticated: boolean;
  path: string;
  children?: React.ReactNode;
}

function PublicRoute({
  isAuthenticated,
  children,
  ...props
}: PublicRouteProps) {
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          <Redirect to={{ pathname: '/lists', state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
}

export default PublicRoute;
