import { useQuery } from 'react-query';
import getLists from '../../api/queries/getLists';

function Lists() {
  const listsQuery = useQuery('getLists', getLists, {
    // onSuccess: (data) => updateLists(data) // TODO: Update on redux?
  });

  const hasZeroItems = !listsQuery.isLoading && listsQuery.data?.length === 0;
  const hasItems = !!(
    !listsQuery.isLoading &&
    listsQuery.data?.length &&
    listsQuery.data?.length > 0
  );

  return (
    <>
      <h1>My lists</h1>
      {listsQuery.isLoading && <p>Getting lists...</p>}
      {hasZeroItems && <p>No lists. Create one.</p>}
      {hasItems && (
        <ul>
          {listsQuery.data?.map((list) => (
            <li>{list.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Lists;
