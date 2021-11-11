import Head from 'next/head';
import { useState } from 'react';

import Forgot from '@/modules/auth/ForgotPassword';
import axios from '@/utils/axios';
import { isAuthenticated } from '@/utils/auth';

export async function getServerSideProps(context) {
  const data = await isAuthenticated(context);
  if (data.status) {
    return {
      redirect: {
        destination: routePaths[data.role]['index'],
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function ForgotPassword() {
  const [showForm, setShowForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const forgotPasswordHandler = (email) => {
    axios
      .post('/auth/forgotPassword', { email })
      .then((response) => {
        console.log(response);
        setShowForm(false);
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
      {showForm ? (
        <Forgot submitForm={(e) => forgotPasswordHandler(e)} errorMessage={errorMessage} />
      ) : (
        <div className={'text-2xl font-semibold my-20 text-center'}>
          Your token is sent to your mail
          <span
            className={'text-blue-500 cursor-pointer hover:underline hover:text-blue-700 block'}
            onClick={() => setShowForm(true)}
          >
            Resend it
          </span>
        </div>
      )}
    </div>
  );
}
