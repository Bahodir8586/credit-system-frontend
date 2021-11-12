import { useState } from 'react';

import Modal from '@/components/modalComponent';
import InputComponent from '@/components/inputComponent';
import TextareaComponent from '@/components/textareaComponent';
import FileInputComponent from '@/components/fileInputComponent';

export default function EditModal({ product, show, onConfirm, onCancel }) {
  const { name, price, priceDiscount, description } = product;
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newpriceDiscount, setNewPriceDiscount] = useState(priceDiscount);
  const [newDescription, setNewDescription] = useState(description);
  const [newImage, setNewImage] = useState(undefined);
  return (
    <Modal
      title="Update Product"
      show={show}
      onConfirm={() => {
        onConfirm(amount);
      }}
      onCancel={() => {
        onCancel();
      }}
    >
      <InputComponent
        input={{ label: 'Name', type: 'text', placeholder: 'Name', value: newName }}
        onChange={(val) => setNewName(val)}
        error={undefined}
      />
      <InputComponent
        input={{ label: 'Price', type: 'number', placeholder: 'Price', value: newPrice }}
        onChange={(val) => setNewPrice(val)}
        error={undefined}
      />
      <InputComponent
        input={{
          label: 'Price Discount',
          type: 'number',
          placeholder: 'Price Discount',
          value: newpriceDiscount,
        }}
        onChange={(val) => setNewPriceDiscount(val)}
        error={undefined}
      />
      <TextareaComponent
        input={{ label: 'Description', placeholder: 'Description...', value: newDescription }}
        onChange={(val) => setNewDescription(val)}
        error={undefined}
      />
      <FileInputComponent
        input={{
          label: 'Image of Product',
          value: newImage,
        }}
        onChange={(val) => setNewImage(val)}
        error={undefined}
      />
    </Modal>
  );
}
