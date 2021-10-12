import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import getList from '../../api/queries/getList';
import {
  setCurrentList,
  tasksSelectors,
  addTask,
} from '../../redux/features/currentList';
import { listsSelectors } from '../../redux/features/lists';
import { useAppSelector, useDispatch } from '../../redux/hooks';
import EditingTask from './EditingTask';
import ReadModeTask from './ReadModeTask';

const Tasks = () => {
  const dispatch = useDispatch();
  const { listId } = useParams<{ listId: string }>();
  const tasks = useAppSelector(tasksSelectors.selectAll);

  const listData = useAppSelector((state) =>
    listsSelectors.selectById(state, listId)
  );
  const [editingId, setEditingId] = useState<string | undefined>();

  const listQuery = useQuery('getList', () => getList(listId), {
    onSuccess: (data) =>
      dispatch(setCurrentList({ id: listId, tasks: data.tasks! })),
  });

  const handleAddTask = () => {
    const newTaskId = 'newId';
    dispatch(addTask({ id: newTaskId, title: '', due_date: '' }));
    setEditingId(newTaskId);
  };

  const hasZeroItems = !listQuery.isLoading && tasks.length === 0;
  const hasItems = !!(!listQuery.isLoading && tasks.length > 0);

  return (
    <>
      <h1>Tasks in {listData?.title}</h1>
      {listQuery.isLoading && <p>Getting tasks...</p>}
      {hasZeroItems && <p>No tasks. Create one.</p>}
      {hasItems && (
        <ul>
          {tasks?.map((task) => {
            return (
              <li key={task.id}>
                {editingId === task.id ? (
                  <EditingTask task={task} />
                ) : (
                  <ReadModeTask task={task} />
                )}
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={handleAddTask}>Add task</button>
    </>
  );
};

export default Tasks;
