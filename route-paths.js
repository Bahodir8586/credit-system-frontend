const routePaths = {
  signin: '/auth/signin',
  signup: '/auth/signup',
  forgotPassword: '/auth/forgotPassword',
  resetPassword: '/auth/resetPassword',
  admin: {
    index: '/admin',
    profile: '/admin/profile',
    employees: {
      index: '/admin/employees',
      id: '/admin/employees/id',
      add: '/admin/employees/add',
      sales: '/admin/employees/sales',
      credits: '/admin/employees/credits',
    },
    branches: {
      index: '/admin/branches',
      add: '/admin/branches/add',
      id: '/admin/branches/id',
      sales: '/admin/employees/sales',
      credits: '/admin/employees/credits',
    },
    warehouse: {
      index: '/admin/warehouse',
      history: {
        in: {
          index: '/admin/warehouse/in',
          add: '/admin/warehouse/in/add',
        },
        out: {
          index: '/admin/warehouse/out',
          add: '/admin/warehouse/out/add',
        },
      },
    },
  },
  manager: {
    index: '/manager',
    profile: '/manager/profile',
    team: '/manager/team',
    credits: {
      index: '/manager/credits',
      own: '/manager/credits/own',
      add: '/manager/credits/add',
    },
    sales: {
      index: '/manager/sales',
      own: '/manager/sales/own',
      add: '/manager/sales/add',
    },
    assistants: {
      index: '/manager/assistants',
      one: '/manager/assistants/id',
      sales: '/manager/assistants/sales/id',
      credits: '/manager/assistants/credits/id',
    },
  },
  assistant: {
    index: '/assistant',
    profile: '/assistant/profile',
    credits: {
      index: '/assistant/credits',
      add: '/assistant/credits/add',
    },
    sales: {
      index: '/assistant/sales',
      add: '/assistant/sales/add',
    },
  },
  warehouseManager: {
    index: '/warehouseManager',
    profile: '/warehouseManager/profile',
    in: {
      index: '/warehouseManager/in',
      add: '/warehouseManager/in/add',
    },
    out: {
      index: '/warehouseManager/out',
      add: '/warehouseManager/out/add',
    },
  },
  user: {
    profile: '/user/profile',
  },
};
export default routePaths;
