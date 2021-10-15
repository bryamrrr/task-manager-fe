import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  path: string;
  children?: React.ReactNode;
}

function PrivateRoute({
  isAuthenticated,
  children,
  ...props
}: PrivateRouteProps) {
  return (
    <Route
      {...props}
      render={({ location }) => {
        return isAuthenticated ? (
          location.pathname !== '/' ? (
            children
          ) : (
            <Redirect to={{ pathname: '/lists', state: { from: location } }} />
          )
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
}

export default PrivateRoute;
