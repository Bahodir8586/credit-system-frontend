import Head from 'next/head';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import EmployeeForm from '@/modules/admin/employees/employeeForm';
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
  try {
    const response = await fetch('http://localhost:6060/api/branches');
    const data = await response.json();
    const branches = data.data?.branches.map((el) => {
      return { id: el.id, name: el.name };
    });
    return { props: { branches } };
  } catch (error) {
    console.log(error);
  }
  return { props: {} };
}

// TODO: page to create new employee
export default function Home({ branches }) {
  const router = useRouter();
  const submitForm = async (name, email, password, passwordConfirm, role, branch) => {
    console.log(name, email, password, passwordConfirm, role, branch);
    try {
      const response = await axios.post('/users', {
        name,
        email,
        password,
        passwordConfirm,
        role,
        branch,
      });
      console.log(response);
      toast.success('Successfully added');
      router.replace(routePaths['admin']['employees']['index']);
    } catch (e) {
      console.log(e);
      toast.error('Failed to create employee');
    }
  };
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="New employee">
        <EmployeeForm submitForm={submitForm} branches={branches} />
      </AdminLayout>
    </div>
  );
}
