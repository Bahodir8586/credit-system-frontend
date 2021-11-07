import { useState } from 'react';
import { useRouter } from 'next/router';

import Forgot from '@/modules/shared/ForgotPassword';
import axios from '@/utils/axios';

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie?.split('; ').reduce((prevValue, currentValue) => {
    const key = currentValue.split('=')[0];
    prevValue[key] = currentValue.split('=')[1];
    return prevValue;
  }, {});
  if (cookies?.jwt) {
    const response = await fetch('http://localhost:5000/api/users', {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    });
    const data = await response.json();
    if (data.status === 'error' || data.status === 'fail') {
      // Clear the cookie and permit to access
      return { props: {} };
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

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
