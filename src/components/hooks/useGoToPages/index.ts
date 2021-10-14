import { useHistory } from 'react-router-dom';

const useGoToPages = () => {
  const history = useHistory();

  const goToLogin = () => {
    history.push('/login');
  };

  const goToRegister = () => {
    history.push('/register');
  };

  const goToLists = () => {
    history.push('/lists');
  };

  const goToTasks = (listId: string) => {
    history.push(`/lists/${listId}/tasks`);
  };

  return {
    goToLogin,
    goToRegister,
    goToLists,
    goToTasks,
  };
};

export default useGoToPages;
