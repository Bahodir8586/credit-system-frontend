/* eslint-disable @next/next/no-img-element */
import React from 'react';

const BranchInfo = ({ branch }) => {
  return (
    <div>
      <h2 className="text-center font-semibold mb-4 text-lg">Short Description</h2>
      <div className="flex pb-12">
        <div className="w-full px-8">
          <img
            alt={branch.name}
            src={branch.image}
            className="h-auto max-h-64 w-full object-cover"
          />
        </div>
        <div className="w-full px-8">
          {/* TODO: paste there map */}
          <p>{branch.location.address}</p>
          <p>{branch.location.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BranchInfo;
