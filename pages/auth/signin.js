import { useState } from 'react';
import { useRouter } from 'next/router';

import Login from '@/modules/shared/Login';
import axios from '@/utils/axios';

export default function Signin() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const loginHandler = (email, password) => {
    axios
      .post('/users/login', { email, password })
      .then((response) => {
        console.log(response);
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <Login submitForm={(e, p) => loginHandler(e, p)} errorMessage={errorMessage} />;
}
