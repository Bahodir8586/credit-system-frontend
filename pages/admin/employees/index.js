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
  // TODO: Get employees list there
  return { props: {} };
}

const people = [
  {
    id: 1,
    name: 'Jane Cooper',
    branch: { id: 1, name: 'Regional Paradigm Technician' },
    role: 'Manager',
    email: 'jane.cooper@example.com',
  },
  {
    id: 4,
    name: 'John Doe',
    branch: { id: 2, name: 'Product Directives Officer' },
    role: 'Assistant',
    email: 'john.doe@example.com',
  },
  // More people...
];

// TODO: table of all employees (assistant + manager) with sort, search
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
      <AdminLayout pageTitle="Employees">
        <EmployeeFilter search={search} />
        <EmployeeTable people={people} />
      </AdminLayout>
    </div>
  );
}
