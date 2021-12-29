import Head from 'next/head';
import Cookies from 'js-cookie';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import WarehouseHistoryTable from '@/modules/admin/warehouse/warehouseHistoryTable/WarehouseHistoryTable';

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

const data = [
  {
    _id: 1,
    product: {
      image:
        'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      name: 'Product one',
      amount: 150,
    },
    amount: 50,
    timeStamp: '13.12.2021 21:49',
  },
  {
    _id: 2,
    product: {
      image:
        'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
      name: 'Product two',
      amount: 10,
    },
    amount: 100,
    timeStamp: '11.12.2021 09:05',
  },
  {
    _id: 3,
    product: {
      image: 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg',
      name: 'Product three',
      amount: 250,
    },
    amount: 90,
    timeStamp: '11.12.2021 09:04',
  },
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Credit System</title>
        <meta name="description" content="Credit system application" />
      </Head>
      <AdminLayout pageTitle="Warehouse out dashboard">
        <WarehouseHistoryTable data={data} />
      </AdminLayout>
    </div>
  );
}
