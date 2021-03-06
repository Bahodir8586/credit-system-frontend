import { useState } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import AdminLayout from '@/layouts/admin/AdminLayout';
import EmployeeTable from '@/modules/admin/employees/employeeTable';
import EmployeeFilter from '@/modules/admin/employees/employeeFilter';
import axios from '@/utils/axios';
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
    const response = await fetch('http://localhost:6060/api/users', {
      headers: { authorization: `Bearer ${jwt}` },
    });
    const data = await response.json();
    // console.log(data.data?.users);
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
  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      const updatedUsers = users.filter((el) => el._id !== id);
      setUsers(updatedUsers);
      toast.success('Successfully deleted');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete user');
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
        <EmployeeTable people={users} deleteUser={deleteUser} />
      </AdminLayout>
    </div>
  );
}
