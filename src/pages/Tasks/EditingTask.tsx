import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useAppSelector } from '../../redux/hooks';
import {
  addTask,
  removeTask,
  tasksSelectors,
  updateTask,
} from '../../redux/features/currentList';
import { Task } from '../../types';
import createTask from '../../api/mutations/createTask';

interface EditingTaskProps {
  task: Task;
}

const EditingTask = ({ task }: EditingTaskProps) => {
  const dispatch = useDispatch();
  const { listId } = useParams<{ listId: string }>();
  const newTask = useAppSelector((state) =>
    tasksSelectors.selectById(state, 'newId')
  );
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask) {
      newTaskMutation.mutate(newTask);
    }
  };

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

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <form onSubmit={handleSubmit}>
      <input type="text" value={task.title} onChange={handleChange} autoFocus />
      <input type="date" value={task.due_date} onChange={handleChangeDate} />
      <button type="submit">Create</button>
    </form>
  );
};

export default EditingTask;
