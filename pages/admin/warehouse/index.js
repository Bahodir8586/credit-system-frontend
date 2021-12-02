import { useState, useMemo } from 'react';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import AdminLayout from '@/layouts/admin/AdminLayout';
import WarehouseTable from '@/modules/admin/warehouse/warehouseTable';
import WarehouseFilter from '@/modules/admin/warehouse/warehouseFilter';
import InModal from '@/modules/admin/warehouse/warehouseModals/inModal';
import OutModal from '@/modules/admin/warehouse/warehouseModals/outModal';
import EditModal from '@/modules/admin/warehouse/warehouseModals/editModal';
import { isAuthenticated } from '@/utils/auth';
import { getCookie } from '@/utils/cookies';
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
  const jwt = data.jwt;
  // TODO: Get employees list there
  try {
    const response = await fetch('http://localhost:6060/api/products', {
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
  const [product, setProduct] = useState({});

  const search = async () => {};

  const warehouseIn = async (id, amount) => {
    console.log(id, amount);
    setShowInModal(false);
    setProductId(undefined);
    try {
      const response = await axios.patch(
        `/products/in/${id}`,
        { amount },
        // { headers: { Authorization: `Bearer ${getCookie('jwt')}` } }
      );
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
    console.log(id, name, price, priceDiscount, image, description);
    setShowEditModal(false);
    setProductId(undefined);
    setProduct({});
    try {
      let data;
      if (image) {
        data = new FormData();
        data.append('name', name);
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

  const inModal = useMemo(
    () => (
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
    ),
    [productId, showInModal]
  );
  const outModal = useMemo(
    () => (
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
    ),
    [productId, showOutModal]
  );
  const editModal = useMemo(
    () => (
      <EditModal
        product={product}
        show={showEditModal}
        onConfirm={(name, price, priceDiscount, image, description) => {
          updateProduct(productId, name, price, priceDiscount, image, description);
        }}
        onCancel={() => {
          setProductId(undefined);
          setProduct({});
          setShowEditModal(false);
        }}
      />
    ),
    [product, productId, showEditModal]
  );
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
          updateProduct={(prod, id) => {
            setProductId(id);
            setProduct(prod);
            setShowEditModal(true);
          }}
        />
        {inModal}
        {outModal}
        {editModal}
      </AdminLayout>
    </div>
  );
}
