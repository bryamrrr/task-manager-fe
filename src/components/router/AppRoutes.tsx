import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import PrivateRoute from './PrivateRoute';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoute from './PublicRoute';

function AppRoutes() {
  const isAuthenticated = false;

  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
          <Login />
        </PublicRoute>
        <PublicRoute path="/register" isAuthenticated={isAuthenticated}>
          <Register />
        </PublicRoute>
        <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
          <ProtectedRoutes />
        </PrivateRoute>
        <Route path="*">Page not found</Route>
      </Switch>
    </Router>
  );
}

export default AppRoutes;
