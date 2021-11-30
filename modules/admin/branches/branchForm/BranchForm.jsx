import { useState } from 'react';
import Link from 'next/link';

import InputComponent from '@/components/inputComponent';
import FileInputComponent from '@/components/fileInputComponent/FileInputComponent';
import routePaths from '@/route-paths';

export default function EmployeeForm({ submitForm }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(undefined);
  const [longitude, setLongitude] = useState(69.240562);
  const [latitude, setLatitude] = useState(41.311081);
  return (
    <form
      className="max-w-3xl mx-auto space-y-8 divide-y divide-gray-200 border p-8 bg-gray-50 shadow-md rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm(name, longitude, latitude, address, description, image);
      }}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <h3 className="text-xl text-center leading-6 font-medium text-gray-900">Create branch</h3>
          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <InputComponent
              input={{
                label: 'Branch Name',
                placeholder: 'Branch name',
                value: name,
                type: 'text',
              }}
              onChange={(val) => setName(val)}
              error={undefined}
            />
            <FileInputComponent
              input={{
                label: 'Image of Product',
                value: image,
              }}
              onChange={(val) => setImage(val)}
              error={undefined}
            />
            <InputComponent
              input={{
                label: 'Address',
                placeholder: 'Address',
                value: address,
                type: 'text',
              }}
              onChange={(val) => setAddress(val)}
              error={undefined}
            />
            <InputComponent
              input={{
                label: 'Description',
                placeholder: 'Description',
                value: description,
                type: 'text',
              }}
              onChange={(val) => setDescription(val)}
              error={undefined}
            />
            <InputComponent
              input={{
                label: 'Longitude',
                placeholder: 'Longitude',
                value: longitude,
                type: 'number',
              }}
              onChange={(val) => setLongitude(val)}
              error={undefined}
            />
            <InputComponent
              input={{
                label: 'Branch Name',
                placeholder: 'Branch name',
                value: latitude,
                type: 'number',
              }}
              onChange={(val) => setLatitude(val)}
              error={undefined}
            />
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <Link passHref={true} href={routePaths['admin']['branches']['index']}>
              <a className="ml-3 transition duration-200 inline-flex justify-center py-2 px-4 border border-indigo-600 shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Cancel
              </a>
            </Link>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => {
                e.preventDefault();
                submitForm(name, longitude, latitude, address, description, image);
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
