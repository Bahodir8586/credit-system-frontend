import React from 'react';
import Link from 'next/link';
import BranchCard from './branchCard';

const Branches = ({ branches }) => {
  return (
    <div className="flex justify-center flex-wrap">
      {branches.map((el) => {
        const { branch, employees } = el;
        return (
          <BranchCard
            _id={branch._id}
            key={branch._id}
            name={branch.name}
            image={branch.image}
            address={branch.location.address}
            description={branch.location.description}
            numberOfEmployees={employees?.length}
          />
        );
      })}
    </div>
  );
};

export default Branches;
