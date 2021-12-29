/* eslint-disable @next/next/no-img-element */
import { PlusIcon, MinusIcon, PencilIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import routePaths from '@/route-paths';

export default function WarehouseTable({ products, warehouseIn, warehouseOut, updateProduct }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={`http://localhost:6060/public/img/products/${product.image}`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.price}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.priceDiscount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-center items-center  space-x-4">
                        <PlusIcon
                          className="rounded transition duration-200 w-8 h-8 text-white bg-green-600 cursor-pointer hover:bg-green-800"
                          onClick={() => warehouseIn(product._id)}
                        />
                        <MinusIcon
                          className="rounded transition duration-200 w-8 h-8 text-white bg-red-600 cursor-pointer hover:bg-red-800"
                          onClick={() => warehouseOut(product._id)}
                        />
                        <PencilIcon
                          className="rounded transition duration-200 w-8 h-8 text-white bg-indigo-600 cursor-pointer hover:bg-indigo-800"
                          onClick={() => updateProduct(product, product._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center items-center py-4">
            <Link passHref href={routePaths['admin']['warehouse']['history']['in']}>
              <button className="mt-4 mr-4 md:mt-0 w-40 flex items-center text-base px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                <PlusIcon className="h-5 w-5 flex-shrink-0 mr-2" />
                History In
              </button>
            </Link>
            <Link passHref href={routePaths['admin']['warehouse']['history']['out']}>
              <button className="mt-4 md:mt-0 w-40 flex items-center text-base px-4 py-2 font-semibold text-white bg-pink-600 rounded-lg shadow-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-pink-200">
                <MinusIcon className="h-5 w-5 flex-shrink-0 mr-2" />
                History Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
