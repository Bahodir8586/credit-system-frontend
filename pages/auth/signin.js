import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Login from '@/modules/auth/Login';
import axios from '@/utils/axios';
import { isAuthenticated } from '@/utils/auth';
import routePaths from '@/route-paths';

export async function getServerSideProps(context) {
  const data = await isAuthenticated(context);
  if (data.status) {
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
        const role = response.data.data.user.role;
        router.push(routePaths[role]['index']);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message);
      });
  };
  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <Login submitForm={(e, p) => loginHandler(e, p)} errorMessage={errorMessage} />
    </div>
  );
}
