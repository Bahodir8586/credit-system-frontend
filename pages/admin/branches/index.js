import Head from 'next/head';
import Cookies from 'js-cookie';
import { useState } from 'react';

import AdminLayout from '@/layouts/admin/AdminLayout';
import BranchFilter from '@/modules/admin/branches/branchFilter';
import Branches from '@/modules/admin/branches';
import { isAuthenticated } from '@/utils/auth';
import axios from '@/utils/axios';
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
  try {
    const response = await fetch('http://localhost:6060/api/branches');
    const data = await response.json();
    console.log(data.data?.branches);
    return {
      props: { branchesList: data.data?.branches },
    };
  } catch (e) {
    console.log(e);
    return { props: { branchesList: null } };
  }
}

// TODO: page to show all branches as cards
export default function Home({ branchesList }) {
  const [branches, setBranches] = useState(branchesList);
  const search = async (name) => {
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
      <AdminLayout pageTitle="Branches">
        <BranchFilter search={search} />
        <Branches branches={branches} />
      </AdminLayout>
    </div>
  );
}
