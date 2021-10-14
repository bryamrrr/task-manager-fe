import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import createList from '../../api/mutations/createList';
import getLists from '../../api/queries/getLists';
import { StyledTransparentTextInput } from '../../components/formControls';
import StyledLinkButton from '../../components/formControls/StyledLinkButton';
import useEnterKey from '../../components/hooks/useEnterKey';
import useGoToPages from '../../components/hooks/useGoToPages';
import {
  addList,
  addLists,
  listsSelectors,
  removeList,
  updateList,
} from '../../redux/features/lists';
import { useAppSelector, useDispatch } from '../../redux/hooks';

const StyledListsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const StyledListCard = styled.li`
  background-color: ${({ theme }) => theme.checkBackground};
  border-radius: 7px;
  box-sizing: border-box;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-right: 3%;
  padding: 1rem;
  position: relative;
  width: 47%;
  &:nth-child(2n) {
    margin-right: 0;
  }
  &:hover {
    opacity: 0.85;
  }
`;

const StyledListTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledIconWrapper = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.avatarBackground};
  border-radius: 50%;
  color: ${({ theme }) => theme.secondaryText};
  display: flex;
  height: 25px;
  justify-content: center;
  margin-bottom: 0.6rem;
  width: 25px;
  span {
    font-size: 0.8rem;
  }
`;

const StyledListTasksNumber = styled.div`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1.75rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

function Lists() {
  const dispatch = useDispatch();
  const { goToTasks } = useGoToPages();
  const lists = useAppSelector(listsSelectors.selectAll);
  const [editingId, setEditingId] = useState<string | undefined>();

  const listsQuery = useQuery('getLists', getLists, {
    onSuccess: (data) => dispatch(addLists(data)),
  });

  const newListMutation = useMutation('newList', createList, {
    onSuccess: (list) => {
      dispatch(removeList('newId'));
      dispatch(addList(list));
    },
  });

  const handleAddList = () => {
    const newListId = 'newId';
    dispatch(addList({ id: newListId, title: '' }));
    setEditingId(newListId);
  };

  const handleBlurNewList = (e: React.FocusEvent<HTMLInputElement>) => {
    const text = e.target.value.trim();
    if (text === '') {
      dispatch(removeList('newId'));
    } else {
      newListMutation.mutate(text);
    }
    setEditingId(undefined);
  };

  useEnterKey({ callback: handleBlurNewList, enabled: !!editingId });

  const hasZeroItems = !listsQuery.isLoading && lists.length === 0;
  const hasItems = !!(!listsQuery.isLoading && lists.length > 0);

  return (
    <>
      <h1>My lists</h1>
      {listsQuery.isLoading && <p>Getting lists...</p>}
      {hasZeroItems && <p>No lists. Create one.</p>}
      {hasItems && (
        <StyledListsWrapper>
          {lists?.map((list) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                updateList({
                  id: list.id,
                  changes: {
                    title: e.target.value,
                  },
                })
              );
            };

            return (
              <StyledListCard key={list.id} onClick={() => goToTasks(list.id)}>
                <StyledListTitleWrapper>
                  <StyledIconWrapper>
                    <span>{list.title.substr(0, 1)}</span>
                  </StyledIconWrapper>
                  {editingId === list.id ? (
                    <StyledTransparentTextInput
                      type="text"
                      value={list.title}
                      onChange={handleChange}
                      onBlur={handleBlurNewList}
                      autoFocus
                    />
                  ) : (
                    <span>{list.title}</span>
                  )}
                </StyledListTitleWrapper>
                <StyledListTasksNumber>
                  {list.tasks?.filter((task) => !task.done).length || 0}
                </StyledListTasksNumber>
              </StyledListCard>
            );
          })}
        </StyledListsWrapper>
      )}
      <StyledLinkButton onClick={handleAddList}>+ Add list</StyledLinkButton>
    </>
  );
}

export default Lists;
