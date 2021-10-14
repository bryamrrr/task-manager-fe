import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import getList from '../../api/queries/getList';
import StyledLinkButton from '../../components/formControls/StyledLinkButton';
import {
  setCurrentList,
  tasksSelectors,
  addTask,
  getCurrentListTitle,
} from '../../redux/features/currentList';
import { useAppSelector, useDispatch } from '../../redux/hooks';
import EditingTask from './EditingTask';
import ReadModeTask from './ReadModeTask';
import useGoToPages from '../../components/hooks/useGoToPages';
import styled from 'styled-components';

const StyledButtonsWrapper = styled.div<{ sortByDate: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-right: 1.65rem;

  ${({ sortByDate, theme }) =>
    sortByDate
      ? `button:nth-child(2) { color: ${theme.secondaryText} !important; }`
      : ''}
`;

const Tasks = () => {
  const dispatch = useDispatch();
  const { goToLists } = useGoToPages();
  const { listId } = useParams<{ listId: string }>();
  const listTitle = useAppSelector(getCurrentListTitle);
  const tasks = useAppSelector(tasksSelectors.selectAll);
  const [sortByDate, setSortByDate] = useState<boolean>(false);

  const [editingId, setEditingId] = useState<number | undefined>();

  const listQuery = useQuery(`getList${listId}`, () => getList(listId), {
    onSuccess: (data) =>
      dispatch(
        setCurrentList({ id: listId, title: data.title, tasks: data.tasks! })
      ),
  });

  const handleAddTask = () => {
    const newTaskId = Infinity;
    dispatch(
      addTask({
        id: newTaskId,
        title: '',
        due_date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      })
    );
    setEditingId(newTaskId);
  };

  const hasZeroItems = !listQuery.isLoading && tasks.length === 0;
  const hasItems = !!(!listQuery.isLoading && tasks.length > 0);

  return (
    <>
      <StyledLinkButton onClick={goToLists}>Back</StyledLinkButton>
      <h1>{listTitle}</h1>
      {listQuery.isLoading && <p>Getting tasks...</p>}
      {hasZeroItems && <p>No tasks. Create one.</p>}
      {hasItems && (
        <ul>
          {(sortByDate
            ? [...tasks]?.sort((a, b) => dayjs(a.due_date).diff(b.due_date))
            : tasks
          ).map((task) => {
            return (
              <li key={task.id}>
                {editingId === task.id ? (
                  <EditingTask task={task} setEditingId={setEditingId} />
                ) : (
                  <ReadModeTask task={task} />
                )}
              </li>
            );
          })}
        </ul>
      )}

      {!editingId && (
        <StyledButtonsWrapper sortByDate={sortByDate}>
          <StyledLinkButton onClick={handleAddTask}>
            + Add a task
          </StyledLinkButton>
          <StyledLinkButton onClick={() => setSortByDate(!sortByDate)}>
            ↓ Sort by date
          </StyledLinkButton>
        </StyledButtonsWrapper>
      )}
    </>
  );
};

export default Tasks;
