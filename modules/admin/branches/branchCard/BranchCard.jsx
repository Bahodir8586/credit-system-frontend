/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import routePaths from '@/route-paths';

const BranchCard = ({ _id, name, address, description, image, numberOfEmployees }) => {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-96 w-60 md:w-80 cursor-pointer mx-auto my-6">
      <Link href={`${routePaths['admin']['branches']['index']}/${_id}`} passHref>
        <a className="w-full block h-full">
          <img alt={name} src={image} className="max-h-40 w-full object-cover" />
          <div className="bg-white dark:bg-gray-800 w-full p-4 h-full">
            <h4 className="text-indigo-500 text-xl font-medium text-center">{name}</h4>
            <p className="text-gray-800 dark:text-white text-md font-medium mb-2">
              Number of employees: {numberOfEmployees}
            </p>
            <p className="text-gray-400 dark:text-gray-300 font-light text-md">{address}</p>
            <p className="text-gray-400 dark:text-gray-300 font-light text-md">{description}</p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BranchCard;
