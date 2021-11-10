import Head from 'next/head';
import Cookies from 'js-cookie';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import EmployeeTable from '@/modules/admin/employeeTable';
import EmployeeFilter from '@/modules/admin/employeeFilter';

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
  // TODO: Get employees list there
  try {
    const response = await fetch('http://localhost:5000/api/users', {
      headers: { authorization: `Bearer ${jwt}` },
    });
    const data = await response.json();
    console.log(data);
    return {
      props: { people: data.data?.users },
    };
  } catch (e) {
    console.log(e);
    return { props: { people: null } };
  }
}

// TODO: table of all employees (assistant + manager) with sort, search
export default function Home({ people }) {
  const search = (name) => {
    // TODO: search user according to name
  };
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="Employees">
        <EmployeeFilter search={search} />
        <EmployeeTable people={people} />
      </AdminLayout>
    </div>
  );
}
