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
    },
    shops: {
      index: '/admin/shops',
      add: '/admin/shops/add',
      id: '/admin/shops/id',
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
    managers: {
      index: '/admin/managers',
      team: {
        index: '/admin/managers/team',
        sales: '/admin/managers/team/sales',
        credits: '/admin/managers/team/credits',
      },
      sales: '/admin/managers/sales',
      credits: '/admin/managers/credits',
    },
    assistants: {
      index: '/admin/assistants',
      sales: '/admin/assistants/sales',
      credits: '/admin/assistants/credits',
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
