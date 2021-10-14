import React from 'react';
import { useMutation } from 'react-query';
import createUser from '../../api/mutations/createUser';
import {
  StyledButton,
  StyledForm,
  StyledTextInput,
} from '../../components/formControls';
import useGoToPages from '../../components/hooks/useGoToPages';
import useUserFormValues from '../../components/hooks/useUserFormValues';

function Register() {
  const { goToLogin } = useGoToPages();
  const { email, password, onChangeEmail, onChangePassword } =
    useUserFormValues();

  const createUserMutation = useMutation(createUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    createUserMutation.mutate({ email, password });
    goToLogin();
  };

  return (
    <>
      <h1>Sign up</h1>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTextInput type="text" value={email} onChange={onChangeEmail} />
        <StyledTextInput
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        <StyledButton type="submit" disabled={!email || !password}>
          {createUserMutation.isLoading ? 'Creating...' : 'Create'}
        </StyledButton>
      </StyledForm>
    </>
  );
}

export default Register;
