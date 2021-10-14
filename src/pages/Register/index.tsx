import React, { useState } from 'react';
import { useMutation } from 'react-query';
import createUser from '../../api/mutations/createUser';
import {
  StyledButton,
  StyledForm,
  StyledTextInput,
} from '../../components/formControls';
import useGoToPages from '../../components/hooks/useGoToPages';
import useUserFormValues from '../../components/hooks/useUserFormValues';
import StyledErrorMessage from '../../components/StyledErrorMessage';

function Register() {
  const { goToLogin } = useGoToPages();
  const [error, setError] = useState<string>('');
  const { email, password, onChangeEmail, onChangePassword } =
    useUserFormValues();

  const createUserMutation = useMutation(createUser, {
    onSuccess: () => {
      goToLogin();
    },
    onError: () => {
      setError('An error ocurred.');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!email || !password) return;
    createUserMutation.mutate({ email, password });
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
      {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
    </>
  );
}

export default Register;
