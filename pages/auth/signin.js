import { useState } from 'react';
import { useRouter } from 'next/router';

import Login from '@/modules/shared/Login';
import axios from '@/utils/axios';
import routePaths from '@/route-paths';

export default function Signin() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const loginHandler = (email, password) => {
    axios
      .post('/users/signin', { email, password })
      .then((response) => {
        console.log(response);
        router.push(routePaths.home);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message);
      });
  };
  return <Login submitForm={(e, p) => loginHandler(e, p)} errorMessage={errorMessage} />;
}
