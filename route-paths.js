const routePaths = {
  signin: '/auth/signin',
  signup: '/auth/signup',
  forgotPassword: '/auth/forgotPassword',
  resetPassword: '/auth/resetPassword',
  admin: {
    index: '/admin',
    profile: '/admin/profile',
    warehouse: '/admin/warehouse',
  },
  manager: {
    index: '/manager',
    profile: '/manager/profile',
    team: '/manager/team',
    credits: {
      index: '/manager/credits/all',
      own: '/manager/credits/own',
      add: '/assistant/credits/add',
    },
    sales: {
      index: '/manager/sales/all',
      own: '/manager/sales/own',
      add: '/assistant/sales/add',
    },
    assistant: {
      index: '/manager/assistant',
      sales: '/manager/assistant/id/sales',
      credits: '/manager/assistant/id/credits',
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
    index: '/warehouse-manager',
    profile: '/warehouse-manager/profile',
    in: {
      index: '/warehouse-manager/in',
      add: '/warehouse-manager/in/add',
    },
    out: {
      index: '/warehouse-manager/out',
      add: '/warehouse-manager/out/add',
    },
  },
  user: {
    profile: '/user/profile',
  },
};
export default routePaths;
