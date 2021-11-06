import { useState } from 'react';
import { useRouter } from 'next/router';

import Reset from '@/modules/shared/ResetPassword';
import axios from '@/utils/axios';

export default function ResetPassword() {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const resetPasswordHandler = (password, passwordConfirm) => {
    const token = router.query.token;
    axios
      .post(`/users/resetPassword/${token}`, { password, passwordConfirm })
      .then((response) => {
        console.log(response);
        router.push('/');
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
        setErrorMessage(error.response?.data?.message);
      });
  };
  return <Reset submitForm={(p, pc) => resetPasswordHandler(p, pc)} errorMessage={errorMessage} />;
}
