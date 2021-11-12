import Head from 'next/head';
import Cookies from 'js-cookie';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import WarehouseTable from '@/modules/admin/warehouse/warehouseTable';
import WarehouseFilter from '@/modules/admin/warehouse/warehouseFilter';

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
    const response = await fetch('http://localhost:5000/api/products', {
      headers: { authorization: `Bearer ${jwt}` },
    });
    const data = await response.json();
    console.log(data);
    return {
      props: { products: data.data?.products },
    };
  } catch (e) {
    console.log(e);
    return { props: { products: null } };
  }
}

// TODO: All available products of warehouse
export default function Home({ products }) {
  const search = () => {};
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="Warehouse">
        <WarehouseFilter search={search} />
        <WarehouseTable products={products} />
      </AdminLayout>
    </div>
  );
}
