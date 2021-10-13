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
import styled from 'styled-components';
import StyledButton from '../../components/formControls/StyledButton';

const StyledEditingTaskWrapper = styled.div`
  background-color: #3d3d3d;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const StyledTextInput = styled.input`
  border: 1px solid
    ${({ value, theme }) => (value === '' ? theme.error : 'transparent')};
  font-size: 15px;
  margin-left: -2px;

  &,
  &:focus {
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    caret-color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.primaryFont};
    outline-width: 0;
  }
  &:focus {
    border-color: transparent;
  }
`;

const SyledButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0;
  button {
    flex-grow: 1;
    flex-basis: calc(50%-0.5rem);
  }
`;

const StyledDateWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledInputDateTime = styled.input`
  background-color: #52555d;
  border: none;
  border-radius: 7px;
  color: ${({ theme }) => theme.text};
  padding: 0.15rem 0.25rem;
  &::-webkit-calendar-picker-indicator {
    filter: invert(0.65);
  }
`;

interface EditingTaskProps {
  task: Task;
  setEditingId: (value: undefined) => void;
}

const EditingTask = ({ task, setEditingId }: EditingTaskProps) => {
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

  const handleCancel = () => {
    dispatch(removeTask('newId'));
    setEditingId(undefined);
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
    <StyledEditingTaskWrapper>
      <form onSubmit={handleSubmit}>
        <StyledTextInput
          type="text"
          value={task.title}
          onChange={handleChange}
          autoFocus
        />
        <StyledDateWrapper>
          <span>Due date: </span>
          <StyledInputDateTime
            type="date"
            value={task.due_date}
            onChange={handleChangeDate}
          />
        </StyledDateWrapper>
        <SyledButtonsWrapper>
          <StyledButton type="button" onClick={handleCancel}>
            Cancel
          </StyledButton>
          <StyledButton type="submit" disabled={!task.title}>
            Create
          </StyledButton>
        </SyledButtonsWrapper>
      </form>
    </StyledEditingTaskWrapper>
  );
};

export default EditingTask;
