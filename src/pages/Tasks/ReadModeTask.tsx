import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import toggleTask from '../../api/mutations/toggleTask';
import { updateTask } from '../../redux/features/currentList';
import { Task } from '../../types';

const StyledTaskWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
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
    <StyledTaskWrapper>
      <StyledCheckboxUI
        checked={!!task.done}
        onClick={() =>
          toggleTaskMutation.mutate({
            id: task.id,
            done: !!task.done,
          })
        }
      >
        <div />
      </StyledCheckboxUI>
      <StyledTitle checked={!!task.done}>{task.title}</StyledTitle>
    </StyledTaskWrapper>
  );
};

export default ReadModeTask;
