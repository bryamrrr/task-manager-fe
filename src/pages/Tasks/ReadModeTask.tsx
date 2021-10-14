import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import deleteTask from '../../api/mutations/deleteTask';
import toggleTask from '../../api/mutations/toggleTask';
import { StyledLinkButton } from '../../components/formControls';
import { removeTask, updateTask } from '../../redux/features/currentList';
import { Task } from '../../types';
import { getCurrentDate } from '../../utils/dates';

const StyledTaskWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;

  & button {
    opacity: 0;
    position: absolute;
    right: 0;
    transition: all 0.2s;
  }

  &:hover button {
    opacity: 1;
    &:hover {
      opacity: 0.85;
    }
  }
`;

const StyledCheckboxUI = styled.div<{ checked: boolean }>`
  cursor: pointer;
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.checkBackground};
  border-radius: 7px;
  margin-right: 1rem;

  div {
    transition: all 0.25s;
  }

  ${({ checked }) =>
    checked
      ? `
      display:flex;
      align-items: center;
      justify-content: center;
      div {
        background-color: #ccc;
        height: 10px;
        width: 10px;
        border-radius: 50%;
      }
  `
      : ''}:
`;

const StyledTitle = styled.span<{ checked: boolean }>`
  ${({ checked }) =>
    checked
      ? `
    text-decoration: line-through;
  `
      : ''}:
`;

const StyledTitleContainer = styled.div`
  align-items: center;
  display: flex;
`;

const StyledDueDate = styled.span<{ dued?: boolean }>`
  color: ${({ theme, dued }) => (dued ? theme.error : theme.link)};
  font-size: 0.7rem;
  margin-right: 2rem;
`;

interface ReadModeTaskProps {
  task: Task;
}

const ReadModeTask = ({ task }: ReadModeTaskProps) => {
  const dispatch = useDispatch();
  const toggleTaskMutation = useMutation(
    'toggleTask',
    ({ id }: { id: number; done: boolean }) => toggleTask(id),
    {
      onMutate: ({ id, done }: { id: number; done: boolean }) => {
        dispatch(updateTask({ id, changes: { done: !done } }));
      },
    }
  );

  const deleteTaskMutation = useMutation('deleteTask', deleteTask);

  const handleCheckboxClick = () => {
    toggleTaskMutation.mutate({
      id: task.id,
      done: !!task.done,
    });
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
    deleteTaskMutation.mutate(task.id);
  };

  const dued = dayjs(task.due_date).diff(getCurrentDate()) <= 0;

  return (
    <StyledTaskWrapper>
      <StyledTitleContainer>
        <StyledCheckboxUI checked={!!task.done} onClick={handleCheckboxClick}>
          <div />
        </StyledCheckboxUI>
        <StyledTitle checked={!!task.done}>{task.title}</StyledTitle>
      </StyledTitleContainer>
      <StyledDueDate dued={dued}>
        due: {dayjs(task.due_date).format('ddd, MMM D')}
      </StyledDueDate>
      <StyledLinkButton onClick={handleDelete}>╳</StyledLinkButton>
    </StyledTaskWrapper>
  );
};

export default ReadModeTask;
