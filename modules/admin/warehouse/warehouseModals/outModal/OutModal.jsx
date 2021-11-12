import { useState } from 'react';

import Modal from '@/components/modalComponent';
import InputComponent from '@/components/inputComponent';

export default function OutModal({ show, onConfirm, onCancel }) {
  const [amount, setAmount] = useState(0);
  return (
    <Modal
      title="Remove Product"
      show={show}
      onConfirm={() => {
        onConfirm(amount);
      }}
      onCancel={() => {
        setAmount(0);
        onCancel();
      }}
    >
      <InputComponent
        input={{ label: 'Amount', type: 'number', placeholder: 'Amount', value: amount }}
        onChange={(val) => setAmount(val)}
        error={undefined}
      />
    </Modal>
  );
}
