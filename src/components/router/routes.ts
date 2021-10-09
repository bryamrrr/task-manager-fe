import { lazy } from 'react';

const routes = [
  {
    path: 'lists',
    component: lazy(() => import('../../pages/Lists')),
    exact: true,
  },
];

export default routes;
