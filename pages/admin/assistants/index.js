import Head from 'next/head';
import Cookies from 'js-cookie';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';

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
  // TODO: get the list of assistants
  return { props: {} };
}

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Manager',
    email: 'jane.cooper@example.com',
  },
  {
    name: 'Cody Fisher',
    title: 'Product Directives Officer',
    role: 'Manager',
    email: 'cody.fisher@example.com',
  },
  // More people...
];

export default function Home() {
  const search = (name) => {
    // TODO: search user according to name
  };
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="Profile">
        <EmployeeFilter search={search} />
        <EmployeeTable people={people} />
      </AdminLayout>
    </div>
  );
}
