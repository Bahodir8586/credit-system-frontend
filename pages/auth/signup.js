import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Register from '@/modules/auth/Register';
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

export default function Signup() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const registerHandler = async (name, email, password, passwordConfirm) => {
    try {
      const response = await axios.post('/auth/signup', { name, email, password, passwordConfirm });
      console.log(response);
      router.push('/');
    } catch (error) {
      console.log(error.response?.data?.message);
      setErrorMessage(error.response?.data?.message);
    }
  };
  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <Register
        submitForm={(n, e, p, pc) => registerHandler(n, e, p, pc)}
        errorMessage={errorMessage}
      />
    </div>
  );
}
