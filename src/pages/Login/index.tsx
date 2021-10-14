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
  const loginUserMutation = useMutation(loginUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    loginUserMutation.mutate(
      { email, password },
      {
        onSuccess: ({ authentication_token, email }) => {
          setAuthData({ token: authentication_token, email });
          dispatch(updateCurrentUser(email));
        },
      }
    );
  };

  return (
    <>
      <h1>Sign in</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextInput type="text" value={email} onChange={onChangeEmail} />
        <StyledTextInput
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <StyledButton type="submit" disabled={!email || !password}>
          {loginUserMutation.isLoading ? 'Loading...' : 'Login'}
        </StyledButton>
      </StyledForm>
      <StyledText>
        Not a user yet? <Link to="/register">Sign up</Link>
      </StyledText>
    </>
  );
}

export default Login;
