/* eslint-disable @next/next/no-img-element */
import React from 'react';

const BranchCard = ({ name, address, description, image, numberOfEmployees }) => {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-96 w-60 md:w-80 cursor-pointer m-auto">
      <a href="#" className="w-full block h-full">
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
    </div>
  );
};

export default BranchCard;
