import routePaths from '@/route-paths';
import Head from 'next/head';

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie?.split('; ').reduce((prevValue, currentValue) => {
    const key = currentValue.split('=')[0];
    prevValue[key] = currentValue.split('=')[1];
    return prevValue;
  }, {});
  if (!cookies?.jwt) {
    return {
      redirect: {
        destination: routePaths.signin,
        permanent: false,
      },
    };
  }
  const response = await fetch('http://localhost:5000/api/users', {
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const data = await response.json();
  if (data.status === 'error' || data.status === 'fail') {
    return {
      redirect: {
        destination: routePaths.signin,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
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
