import { useState } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import routePaths from '@/route-paths';
import { isAuthenticated } from '@/utils/auth';
import AdminLayout from '@/layouts/admin/AdminLayout';
import WarehouseTable from '@/modules/admin/warehouse/warehouseTable';
import WarehouseFilter from '@/modules/admin/warehouse/warehouseFilter';
import axios from '@/utils/axios';
import InModal from '@/modules/admin/warehouse/warehouseModals/inModal';
import OutModal from '@/modules/admin/warehouse/warehouseModals/outModal';
import EditModal from '@/modules/admin/warehouse/warehouseModals/editModal';

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
  const [productId, setProductId] = useState(undefined);
  const search = async () => {};
  const warehouseIn = async (id, amount) => {
    console.log(id, amount);
    setShowInModal(false);
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
    setShowOutModal(false);
    setProductId(undefined);
    try {
      const response = await axios.patch(`/products/out/${id}`, { amount });
      toast.success('Successfully removed');
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove product');
    }
  };
  const updateProduct = async (id, name, price, priceDiscount, image, description) => {
    setShowEditModal(false);
    setProductId(undefined);
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
      toast.success('Successfully updated');
      console.log(response);
    } catch (error) {
      toast.error('Failed to update product');
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
          warehouseOut={(id) => {
            setProductId(id);
            setShowOutModal(true);
          }}
          updateProduct={(id) => {
            setProductId(id);
            setShowEditModal(true);
          }}
        />
        <InModal
          show={showInModal}
          onConfirm={(amount) => {
            warehouseIn(productId, amount);
          }}
          onCancel={() => {
            setProductId(undefined);
            setShowInModal(false);
          }}
        />
        <OutModal
          show={showOutModal}
          onConfirm={(amount) => {
            warehouseOut(productId, amount);
          }}
          onCancel={() => {
            setProductId(undefined);
            setShowOutModal(false);
          }}
        />
        <EditModal
          show={showEditModal}
          onConfirm={(name, price, priceDiscount, image, description) => {
            updateProduct(productId, name, price, priceDiscount, image, description);
          }}
          onCancel={() => {
            setProductId(undefined);
            setShowEditModal(false);
          }}
        />
      </AdminLayout>
    </div>
  );
}
