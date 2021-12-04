import React from 'react';
import BranchCard from './branchCard';

const Branches = ({ branches }) => {
  console.log(branches);
  return (
    <div className="flex justify-center flex-wrap">
      {branches.map((el) => (
        <BranchCard
          key={el._id}
          name={el.name}
          image={el.image}
          address={el.location.address}
          description={el.location.description}
          numberOfEmployees={el.employees.length}
        />
      ))}
    </div>
  );
};

export default Branches;
