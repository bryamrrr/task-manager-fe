import userEvent from '@testing-library/user-event';
import Lists from '.';
import * as createList from '../../api/mutations/createList';
import { act, render, screen, waitFor } from '../../utils/jest';

jest.mock('../../api/queries/getLists');

describe('Lists page', () => {
  it('behaves as expecte on the happy path', async () => {
    // Setup
    act(() => {
      render(<Lists />);
    });
    const createListSpy = jest.spyOn(createList, 'default');

    // Getting lists (Use getList mock)
    expect(screen.getByText('Getting lists...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Primera lista')).toBeInTheDocument();
      expect(screen.getByText('Segunda lista')).toBeInTheDocument();
    });
    expect(screen.queryByText('Tercera lista')).not.toBeInTheDocument();
    expect(screen.queryByTestId('newListInput')).not.toBeInTheDocument();

    // Clicking Add list creates a new list card
    act(() => {
      const addListButton = screen.getByText('+ Add list');
      userEvent.click(addListButton);
    });
    await waitFor(() => {
      expect(screen.getByTestId('newListInput')).toBeInTheDocument();
    });
    expect(createListSpy).not.toHaveBeenCalled();

    // Write 3 and press Enter calls createList
    act(() => {
      userEvent.keyboard('3');
    });

    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
      userEvent.keyboard('{Enter}');
    });

    expect(createListSpy).toHaveBeenCalled();
    expect(createListSpy).toHaveBeenCalledWith('3');
  });
});
