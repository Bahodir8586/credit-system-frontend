import { useState } from 'react';
import { useRouter } from 'next/router';

import Login from '@/modules/shared/Login';
import axios from '@/utils/axios';
import { isAuthenticated } from '@/utils/auth';

export async function getServerSideProps(context) {
  if (isAuthenticated(context).status) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function Signin() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const loginHandler = (email, password) => {
    axios
      .post('/users/signin', { email, password })
      .then((response) => {
        console.log(response);
        router.push('/');
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message);
      });
  };
  return <Login submitForm={(e, p) => loginHandler(e, p)} errorMessage={errorMessage} />;
}
