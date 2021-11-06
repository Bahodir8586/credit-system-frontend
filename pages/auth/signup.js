import { useState } from 'react';
import { useRouter } from 'next/router';

import Register from '@/modules/shared/Register';
import axios from '@/utils/axios';

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const registerHandler = (email, password) => {
    axios
      .post('/users/signup', { email, password })
      .then((response) => {
        console.log(response);
        router.push(routePaths.home);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message);
      });
  };
  return <Register submitForm={(e, p) => registerHandler(e, p)} errorMessage={errorMessage} />;
}
