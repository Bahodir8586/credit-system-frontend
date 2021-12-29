import Head from 'next/head';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import AdminLayout from '@/layouts/admin/AdminLayout';
import { isAuthenticated } from '@/utils/auth';
import routePaths from '@/route-paths';
import Branch from '@/modules/admin/branches/branch/Branch';

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
  if (context.resolvedUrl.split('/')[1] !== data.role) {
    return {
      redirect: {
        destination: routePaths[data.role].home ?? '/',
        permanent: false,
      },
    };
  }
  const jwt = data.jwt;

  try {
    // TODO: get single branch info there
    const response = await fetch(`http://localhost:6060/api/branches/${context.params.id}`, {
      headers: { authorization: `Bearer ${jwt}` },
    });
    const data = await response.json();
    return { props: { branch: data?.data?.branch } };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: routePaths[data.role]['branches']['index'] ?? '/',
        permanent: false,
      },
    };
  }
}

// TODO: information about the single shop and its employees
export default function Home({ branch }) {
  console.log(branch);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle={branch.branch.name}>
        <Branch branch={branch} />
      </AdminLayout>
    </div>
  );
}
