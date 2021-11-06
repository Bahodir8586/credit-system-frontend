import { useState } from 'react';
import { useRouter } from 'next/router';

import Forgot from '@/modules/shared/ForgotPassword';
import axios from '@/utils/axios';

export default function ForgotPassword() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const forgotPasswordHandler = (email) => {
    axios
      .post('/users/forgotPassword', { email })
      .then((response) => {
        console.log(response);
        router.push('/');
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message);
      });
  };
  return <Forgot submitForm={(e) => forgotPasswordHandler(e)} errorMessage={errorMessage} />;
}
