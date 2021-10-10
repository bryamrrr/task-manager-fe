import React from 'react';
import { useMutation } from 'react-query';
import createUser from '../../api/mutations/createUser';
import useUserFormValues from '../../components/hooks/useUserFormValues';

function Register() {
  const { email, password, onChangeEmail, onChangePassword } =
    useUserFormValues();

  const createUserMutation = useMutation(createUser);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    createUserMutation.mutate({ email, password });
  };

  console.log({ data: createUserMutation.data });

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={email} onChange={onChangeEmail} />
      <input type="password" value={password} onChange={onChangePassword} />
      <button type="submit" disabled={!email || !password}>
        Create
      </button>
    </form>
  );
}

export default Register;
