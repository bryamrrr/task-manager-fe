import userEvent from '@testing-library/user-event';
import Login from '.';
import * as loginUser from '../../api/mutations/loginUser';
import { act, render, screen, waitFor } from '../../utils/jest';

// jest.mock('../../api/queries/getLists');

describe('Login page', () => {
  it('behaves as expecte on the happy path', async () => {
    // Setup
    act(() => {
      render(<Login />);
    });
    const loginUserSpy = jest
      .spyOn(loginUser, 'default')
      .mockImplementation(() =>
        Promise.resolve({
          authentication_token: 'fakeToken',
          email: 'john@gmail.com',
        })
      );

    // Expectations around first UI
    const emailInput = screen.getByTestId('emailInput');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('passwordInput');
    expect(passwordInput).toBeInTheDocument();
    const loginButton = screen.getByText('Login');
    expect(loginButton).toHaveProperty('disabled', true);
    expect(loginUserSpy).not.toHaveBeenCalled();

    // Add email + password and click Login
    act(() => {
      userEvent.type(emailInput, 'john@gmail.com');
      userEvent.type(passwordInput, '123456');
    });

    expect(loginButton).toHaveProperty('disabled', false);
    act(() => {
      userEvent.click(loginButton);
    });

    await waitFor(() => {
      expect(loginUserSpy).toHaveBeenCalled();
    });
  });
});
