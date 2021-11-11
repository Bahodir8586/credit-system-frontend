import { useState } from 'react';
import InputComponent from '@/components/InputComponent';
import SelectComponent from '@/components/SelectComponent';

export default function EmployeeForm({ submitForm }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [priceDiscount, setPriceDiscount] = useState(0);
  return (
    <form
      className="max-w-3xl mx-auto space-y-8 divide-y divide-gray-200 border p-8 bg-gray-50 shadow-md rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <h3 className="text-xl text-center leading-6 font-medium text-gray-900">
            Create product
          </h3>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <InputComponent
              input={{
                label: 'Product Name',
                placeholder: 'Product name',
                value: name,
                type: 'text',
              }}
              onChange={(val) => setName(val)}
              error={undefined}
            />
            <InputComponent
              input={{
                label: 'Amount',
                placeholder: 'Amount',
                value: amount,
                type: 'number',
              }}
              onChange={(val) => setAmount(val)}
              error={undefined}
            />
            <InputComponent
              input={{
                label: 'Price',
                placeholder: 'Price',
                value: name,
                type: 'number',
              }}
              onChange={(val) => setPrice(val)}
              error={undefined}
            />
            <InputComponent
              input={{
                label: 'Price Discount',
                placeholder: 'Price discount',
                value: priceDiscount,
                type: 'number',
              }}
              onChange={(val) => setPriceDiscount(val)}
              error={undefined}
            />
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
