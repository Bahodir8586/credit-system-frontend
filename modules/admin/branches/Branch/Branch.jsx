import React from 'react';

import BranchInfo from './BranchInfo';
import EmployeeTable from './EmployeeTable';

const Branch = ({ branch }) => {
  return (
    <div>
      <BranchInfo branch={branch.branch} />
      <EmployeeTable people={branch.employees} />
    </div>
  );
};

export default Branch;
