import { useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import loginUser from '../../api/mutations/loginUser';
import {
  StyledButton,
  StyledForm,
  StyledTextInput,
} from '../../components/formControls';
import useUserFormValues from '../../components/hooks/useUserFormValues';
import StyledErrorMessage from '../../components/StyledErrorMessage';
import { updateCurrentUser } from '../../redux/features/currentUser';
import { setAuthData } from '../../utils/storage';

const StyledText = styled.p`
  font-size: 0.85rem;
  text-align: center;
`;

function Login() {
  const dispatch = useDispatch();
  const { email, password, onChangeEmail, onChangePassword } =
    useUserFormValues();
  const [error, setError] = useState<string>('');
  const loginUserMutation = useMutation(loginUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return;
    loginUserMutation.mutate(
      { email, password },
      {
        onSuccess: ({ authentication_token, email }) => {
          setAuthData({ token: authentication_token, email });
          dispatch(updateCurrentUser(email));
        },
        onError: () => {
          setError('An error ocurred.');
        },
      }
    );
  };

  return (
    <>
      <h1>Sign in</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextInput
          data-testid="emailInput"
          placeholder="Eg. john@gmail.com"
          type="text"
          value={email}
          onChange={onChangeEmail}
        />
        <StyledTextInput
          data-testid="passwordInput"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <StyledButton type="submit" disabled={!email || !password}>
          {loginUserMutation.isLoading ? 'Loading...' : 'Login'}
        </StyledButton>
      </StyledForm>
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
      <StyledText>
        Not a user yet? <Link to="/register">Sign up</Link>
      </StyledText>
    </>
  );
}

export default Login;
