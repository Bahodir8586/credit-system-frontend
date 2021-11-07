import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

import Forgot from '@/modules/shared/ForgotPassword';
import axios from '@/utils/axios';
import { isAuthenticated } from '@/utils/auth';

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
  return (
    <div>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <Forgot submitForm={(e) => forgotPasswordHandler(e)} errorMessage={errorMessage} />
    </div>
  );
}
