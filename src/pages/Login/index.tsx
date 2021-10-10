import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import loginUser from '../../api/mutations/loginUser';
import useUserFormValues from '../../components/hooks/useUserFormValues';
import { updateCurrentUser } from '../../redux/features/currentUser';
import { setAuthData } from '../../utils/storage';

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
      <div>Login page</div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={onChangeEmail} />
        <input type="password" value={password} onChange={onChangePassword} />
        <button type="submit" disabled={!email || !password}>
          {loginUserMutation.isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  );
}

export default Login;
