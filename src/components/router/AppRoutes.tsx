import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from '../../api';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { useAppSelector } from '../../redux/hooks';
import { getAuthData } from '../../utils/storage';
import Logout from '../Logout';
import PrivateRoute from './PrivateRoute';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoute from './PublicRoute';

function AppRoutes() {
  const currentUser = useAppSelector((state) => state.currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(!!getAuthData());

  useEffect(() => {
    const authData = getAuthData();
    setIsAuthenticated(!!authData);
    if (authData && api.defaults.headers) {
      api.defaults.headers['X-User-Token'] = authData.token;
      api.defaults.headers['X-User-Email'] = authData.email;
    }
  }, [currentUser]);

  return (
    <Router>
      {isAuthenticated && <Logout />}
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
