import { useRouter } from 'next/router';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import AdminLayout from '@/layouts/admin/AdminLayout';
import BranchForm from '@/modules/admin/branches/branchForm';
import { isAuthenticated } from '@/utils/auth';
import routePaths from '@/route-paths';
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
  return { props: {} };
}

// TODO: page to create new shop
export default function Home() {
  const router = useRouter();
  const submit = async (name, longitude, latitude, address, description, image) => {
    console.log(name, longitude, latitude, address, description, image);
    try {
      const submitData = new FormData();
      submitData.append('name', name);
      submitData.append('longitude', longitude);
      submitData.append('latitude', latitude);
      submitData.append('address', address);
      submitData.append('description', description);
      submitData.append('image', image);
      await axios.post('/branches', submitData, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      toast.success('Successfully created');
      router.replace(routePaths['admin']['branches']['index']);
    } catch (error) {
      console.log(error);
      toast.error('Failed to create branch');
    }
  };
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="New Branch">
        <BranchForm submitForm={submit} />
      </AdminLayout>
    </div>
  );
}
