import { useState } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import WarehouseTable from '@/modules/admin/warehouse/warehouseTable';
import WarehouseFilter from '@/modules/admin/warehouse/warehouseFilter';
import Modal from '@/components/Modal';
import InputComponent from '@/components/InputComponent';
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
  const [showInModal, setShowInModal] = useState(false);
  const [showOutModal, setShowOutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [productId, setProductId] = useState(undefined);
  const search = async () => {};
  const warehouseIn = async (id, amount) => {
    setShowInModal(false);
    setAmount(0);
    setProductId(undefined);
    try {
      const response = await axios.patch(`/products/in/${id}`, { amount });
      toast.success('Successfully added');
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product');
    }
  };
  const warehouseOut = async (id, amount) => {
    try {
      const response = await axios.patch(`/products/out/${id}`, { amount });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProduct = async (id, name, price, priceDiscount, image, description) => {
    try {
      let data;
      if (image) {
        data = new FormData();
        data.append('name', name);
        data.append('amount', amount);
        data.append('price', price);
        data.append('priceDiscount', priceDiscount);
        data.append('description', description);
        data.append('image', image);
      } else {
        data = { name, price, priceDiscount, description };
      }
      const response = await axios.patch(`/products/${id}`, data);
      console.log(response);
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

      <AdminLayout pageTitle="Warehouse">
        <WarehouseFilter search={search} />
        <WarehouseTable
          products={products}
          warehouseIn={(id) => {
            setProductId(id);
            setShowInModal(true);
          }}
          warehouseOut={warehouseOut}
          updateProduct={updateProduct}
        />
        <Modal
          title="Modal"
          show={showInModal}
          onConfirm={() => {
            warehouseIn(productId, amount);
          }}
          onCancel={() => {
            setAmount(0);
            setProductId(undefined);
            setShowInModal(false);
          }}
        >
          <InputComponent
            input={{ label: 'Amount', type: 'number', placeholder: 'Amount', value: amount }}
            onChange={(val) => setAmount(val)}
            error={undefined}
          />
        </Modal>
      </AdminLayout>
    </div>
  );
}
