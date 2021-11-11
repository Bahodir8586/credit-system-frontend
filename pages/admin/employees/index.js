import { useState } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import EmployeeTable from '@/modules/admin/employees/employeeTable';
import EmployeeFilter from '@/modules/admin/employees/employeeFilter';
import axios from '@/utils/axios';

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
  const [users, setUsers] = useState(people);
  const search = async (name) => {
    // TODO: search user according to name
    try {
      const response = await axios.get(`/users?name=${name}`);
      const users = response.data?.data?.users;
      setUsers(users);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="Employees">
        <EmployeeFilter search={search} />
        <EmployeeTable people={users} />
      </AdminLayout>
    </div>
  );
}
