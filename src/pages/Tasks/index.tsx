import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import createTask from '../../api/mutations/createTask';
import toggleTask from '../../api/mutations/toggleTask';
import getList from '../../api/queries/getList';
import {
  setCurrentList,
  tasksSelectors,
  updateTask,
  addTask,
  removeTask,
} from '../../redux/features/currentList';
import { listsSelectors } from '../../redux/features/lists';
import { useAppSelector, useDispatch } from '../../redux/hooks';
import { Task } from '../../types';

const Tasks = () => {
  const dispatch = useDispatch();
  const { listId } = useParams<{ listId: string }>();
  const tasks = useAppSelector(tasksSelectors.selectAll);
  const newTask = useAppSelector((state) =>
    tasksSelectors.selectById(state, 'newId')
  );
  const listData = useAppSelector((state) =>
    listsSelectors.selectById(state, listId)
  );
  const [editingId, setEditingId] = useState<string | undefined>();

  const listQuery = useQuery('getList', () => getList(listId), {
    onSuccess: (data) =>
      dispatch(setCurrentList({ id: listId, tasks: data.tasks! })),
  });

  const newTaskMutation = useMutation(
    'newTask',
    (task: Task) => createTask(listId, task),
    {
      onSuccess: (task) => {
        dispatch(removeTask('newId'));
        dispatch(addTask(task));
      },
    }
  );

  const toggleTaskMutation = useMutation(
    'toggleTask',
    ({ id }: { id: string; done: boolean }) => toggleTask(id),
    {
      onMutate: ({ id, done }: { id: string; done: boolean }) => {
        dispatch(updateTask({ id, changes: { done: !done } }));
      },
    }
  );

  const handleAddTask = () => {
    const newTaskId = 'newId';
    dispatch(addTask({ id: newTaskId, title: '' }));
    setEditingId(newTaskId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      newTaskMutation.mutate(newTask);
    }
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
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                updateTask({
                  id: task.id,
                  changes: {
                    title: e.target.value,
                  },
                })
              );
            };

            const handleChangeDate = (
              e: React.ChangeEvent<HTMLInputElement>
            ) => {
              dispatch(
                updateTask({
                  id: task.id,
                  changes: {
                    due_date: e.target.value,
                  },
                })
              );
            };

            return (
              <li key={task.id}>
                {editingId === task.id ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={task.title}
                      onChange={handleChange}
                      autoFocus
                    />
                    <input
                      type="date"
                      value={task.due_date}
                      onChange={handleChangeDate}
                    />
                    <button type="submit">Create</button>
                  </form>
                ) : (
                  <>
                    <span
                      onClick={() =>
                        toggleTaskMutation.mutate({
                          id: task.id,
                          done: !!task.done,
                        })
                      }
                    >
                      {task.title}
                    </span>{' '}
                    / <span>{String(task.done)}</span>
                  </>
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
