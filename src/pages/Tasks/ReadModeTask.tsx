import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import toggleTask from '../../api/mutations/toggleTask';
import { updateTask } from '../../redux/features/currentList';
import { Task } from '../../types';

interface ReadModeTaskProps {
  task: Task;
}

const ReadModeTask = ({ task }: ReadModeTaskProps) => {
  const dispatch = useDispatch();
  const toggleTaskMutation = useMutation(
    'toggleTask',
    ({ id }: { id: string; done: boolean }) => toggleTask(id),
    {
      onMutate: ({ id, done }: { id: string; done: boolean }) => {
        dispatch(updateTask({ id, changes: { done: !done } }));
      },
    }
  );

  return (
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
  );
};

export default ReadModeTask;
