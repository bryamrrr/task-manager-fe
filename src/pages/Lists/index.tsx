import React, { useState } from 'react';
import { useQuery } from 'react-query';
import getLists from '../../api/queries/getLists';
import {
  addList,
  addLists,
  listsSelectors,
  updateList,
} from '../../redux/features/lists';
import { useAppSelector, useDispatch } from '../../redux/hooks';

function Lists() {
  const dispatch = useDispatch();
  const lists = useAppSelector(listsSelectors.selectAll);
  const [editingId, setEditingId] = useState<string | undefined>();

  const listsQuery = useQuery('getLists', getLists, {
    onSuccess: (data) => addLists(data),
  });

  const handleAddList = () => {
    const newListId = 'newId';
    dispatch(addList({ id: newListId, title: '' }));
    setEditingId(newListId);
  };

  const handleBlurNewList = () => {
    setEditingId(undefined);
    // TODO: Create list on API, and remove/replace list with newListID on redux (on mutation success)
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
                  <span>{list.title}</span>
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
