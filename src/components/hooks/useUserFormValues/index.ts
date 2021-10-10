import React, { useState } from 'react';

function useUserFormValues() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return {
    email,
    password,
    onChangeEmail,
    onChangePassword,
  };
}

export default useUserFormValues;
