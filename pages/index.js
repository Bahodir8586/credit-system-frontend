import Head from 'next/head';
import Cookies from 'js-cookie';

import { isAuthenticated } from '@/utils/auth';
import routePaths from '@/route-paths';

export async function getServerSideProps(context) {
  const data = await isAuthenticated(context);
  if (!data.status) {
    Cookies.remove('jwt');
    return {
      redirect: {
        destination: routePaths.signin,
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
    </div>
  );
}
