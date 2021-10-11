import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import createList from '../../api/mutations/createList';
import getLists from '../../api/queries/getLists';
import {
  addList,
  addLists,
  listsSelectors,
  removeList,
  updateList,
} from '../../redux/features/lists';
import { useAppSelector, useDispatch } from '../../redux/hooks';

function Lists() {
  const dispatch = useDispatch();
  const history = useHistory();
  const lists = useAppSelector(listsSelectors.selectAll);
  const [editingId, setEditingId] = useState<string | undefined>();

  const listsQuery = useQuery('getLists', getLists, {
    onSuccess: (data) => dispatch(addLists(data)),
  });

  const newListMutation = useMutation('newList', createList, {
    onSuccess: (list) => {
      console.log({ respnse: list });
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
      setEditingId(undefined);
    } else {
      newListMutation.mutate(text);
    }
  };

  const hasZeroItems = !listsQuery.isLoading && lists.length === 0;
  const hasItems = !!(!listsQuery.isLoading && lists.length > 0);

  return (
    <>
      <h1>My lists</h1>
      {listsQuery.isLoading && <p>Getting lists...</p>}
      {hasZeroItems && <p>No lists. Create one.</p>}
      {hasItems && (
        <ul>
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
              <li key={list.id}>
                {editingId === list.id ? (
                  <input
                    type="text"
                    value={list.title}
                    onChange={handleChange}
                    onBlur={handleBlurNewList}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => history.push(`/lists/${list.id}/todos`)}>
                    {list.title}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={handleAddList}>Add list</button>
    </>
  );
}

export default Lists;
