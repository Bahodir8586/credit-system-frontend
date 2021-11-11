import Head from 'next/head';
import Cookies from 'js-cookie';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import WarehouseInForm from '@/modules/admin/warehouse/warehouseInForm';
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

// TODO: In action for warehouse
export default function Home() {
  const submitForm = async (name, amount, price, priceDiscount, description, image) => {
    console.log(name, amount, price, priceDiscount, description, image);
    const data = new FormData();
    data.append('name', name);
    data.append('amount', amount);
    data.append('price', price);
    data.append('priceDiscount', priceDiscount);
    data.append('description', description);
    data.append('image', image);
    try {
      const response = await axios.post('/products', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="Warehouse In">
        <WarehouseInForm submitForm={submitForm} />
      </AdminLayout>
    </div>
  );
}
