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
    manager: {
      index: '/admin/managers',
      id: '/admin/managers/id',
      team: {
        index: '/admin/manager/team',
        sales: '/admin/manager/team/sales',
        credits: '/admin/manager/team/credits',
      },
      sales: '/admin/manager/sales',
      credits: '/admin/manager/credits',
    },
    assistant: {
      index: '/admin/assistants',
      id: '/admin/assistants/id',
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
      add: '/assistant/credits/add',
    },
    sales: {
      index: '/manager/sales',
      own: '/manager/sales/own',
      add: '/assistant/sales/add',
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
