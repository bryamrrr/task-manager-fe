import { useParams } from 'react-router-dom';

const Todos = () => {
  const { listId } = useParams<{ listId: string }>();
  console.log({ todos_props: listId });
  return <div>Todos page</div>;
};

export default Todos;
