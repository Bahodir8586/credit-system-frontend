import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HomeIcon,
  MenuIcon,
  UsersIcon,
  UserIcon,
  UserGroupIcon,
  OfficeBuildingIcon,
  ClipboardListIcon,
  DatabaseIcon,
  CurrencyDollarIcon,
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';

import routePaths from '@/route-paths';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const AdminLayout = ({ pageTitle, ...props }) => {
  const [navigation, setNavigation] = useState({
    admin: [
      { name: 'Profile', href: routePaths.admin.profile, icon: UserIcon, current: false },
      { name: 'Dashboard', href: routePaths.admin.index, icon: HomeIcon, current: true },
      {
        name: 'Employees',
        href: routePaths.admin.employees.index,
        icon: UsersIcon,
        current: false,
      },
      {
        name: 'Warehouse',
        href: routePaths.admin.warehouse.index,
        icon: DatabaseIcon,
        current: false,
      },
      {
        name: 'Shops',
        href: routePaths.admin.shops.index,
        icon: OfficeBuildingIcon,
        current: false,
      },
      { name: 'Teams', href: routePaths.admin.managers.index, icon: UserGroupIcon, current: false },
    ],
    manager: [
      { name: 'Profile', href: routePaths.manager.profile, icon: UserIcon, current: false },
      { name: 'Dashboard', href: routePaths.manager.index, icon: HomeIcon, current: true },
      { name: 'Team', href: routePaths.manager.team, icon: UsersIcon, current: false },
      {
        name: 'Credits',
        href: routePaths.manager.credits.index,
        icon: ClipboardListIcon,
        current: false,
      },
      {
        name: 'Sales',
        href: routePaths.manager.sales.index,
        icon: CurrencyDollarIcon,
        current: false,
      },
    ],
    assistant: [
      { name: 'Profile', href: routePaths.assistant.profile, icon: UserIcon, current: false },
      { name: 'Dashboard', href: routePaths.assistant.index, icon: HomeIcon, current: true },
      {
        name: 'Credits',
        href: routePaths.assistant.credits,
        icon: ClipboardListIcon,
        current: false,
      },
      { name: 'Sales', href: routePaths.assistant.sales, icon: CurrencyDollarIcon, current: false },
    ],
    warehouseManager: [
      {
        name: 'Profile',
        href: routePaths.warehouseManager.profile,
        icon: UserIcon,
        current: false,
      },
      { name: 'Dashboard', href: routePaths.warehouseManager.index, icon: HomeIcon, current: true },
      {
        name: 'In',
        href: routePaths.warehouseManager.in.index,
        icon: ArrowCircleLeftIcon,
        current: false,
      },
      {
        name: 'Out',
        href: routePaths.warehouseManager.out.index,
        icon: ArrowCircleRightIcon,
        current: false,
      },
    ],
  });

  const router = useRouter();
  const role = router.asPath.split('/')[1];
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fullNavObject = { ...navigation };
    const newNav = [...fullNavObject[role]];
    const currentlyActive = newNav.find((el) => el.current);
    const currentlyClicked = newNav.find((el) => el.href === router.asPath);
    if (currentlyClicked.href === currentlyActive.href) {
      return;
    }
    currentlyActive.current = false;
    currentlyClicked.current = true;
    fullNavObject[role] = newNav;
    setNavigation(fullNavObject);
  }, [router.asPath, role]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                  />
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation[role].map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-300'
                            : 'text-gray-400 group-hover:text-gray-300',
                          'mr-4 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                  alt="Workflow"
                />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                {navigation[role].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{pageTitle}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Replace with your content */}
              <div className="py-4">{props.children}</div>
              {/* /End replace */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
