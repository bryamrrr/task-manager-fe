import Lists from '../../pages/Lists';
import Todos from '../../pages/Tasks';

const routes = [
  {
    path: 'lists',
    component: Lists,
    exact: true,
  },
  {
    path: 'lists/:listId/todos',
    component: Todos,
    exact: true,
  },
];

export default routes;
