import { Route, Switch } from 'react-router-dom';
import routes from './routes';

function ProtectedRoutes() {
  return (
    <Switch>
      {routes.map(({ component: Component, path, exact }) => (
        <Route key={path} path={`/${path}`} exact={exact}>
          <Component />
        </Route>
      ))}
    </Switch>
  );
}

export default ProtectedRoutes;
