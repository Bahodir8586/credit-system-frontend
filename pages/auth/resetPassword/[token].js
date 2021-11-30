import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Reset from '@/modules/auth/ResetPassword';
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

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const resetPasswordHandler = (password, passwordConfirm) => {
    const token = router.query.token;
    axios
      .post(`/auth/resetPassword/${token}`, { password, passwordConfirm })
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
        <title>Reset Password</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <Reset submitForm={(p, pc) => resetPasswordHandler(p, pc)} errorMessage={errorMessage} />
    </div>
  );
}
