import React, { useState } from 'react';
import Link from 'next/link';
import { UserAddIcon, PlusIcon } from '@heroicons/react/outline';
import routePaths from '@/route-paths';

const WarehouseFilter = ({ search }) => {
  const [name, setName] = useState('');
  return (
    <div className="flex flex-col md:flex-row mb-4 justify-center w-full">
      <form
        className="flex md:flex-row justify-between w-full md:space-x-3 space-y-3 md:space-y-0 md:justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          search(name);
        }}
      >
        <div className="font-medium text-xl mr-2 hidden md:inline-flex">Search</div>
        <div className=" relative ">
          <input
            type="text"
            id='"form-subscribe-Filter'
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-72 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            search(name);
          }}
        >
          Search
        </button>
      </form>
      <Link href={routePaths['admin']['warehouse']['add']}>
        <button className="mt-4 md:mt-0 w-48 flex items-center text-base px-4 py-2 font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200">
          <PlusIcon className="h-5 w-5 flex-shrink-0 mr-2" />
          New Product
        </button>
      </Link>
    </div>
  );
};

export default WarehouseFilter;
