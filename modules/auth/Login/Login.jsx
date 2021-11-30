import React, { useState } from 'react';
import Link from 'next/link';

import routePaths from '@/route-paths';

const Login = ({ submitForm, errorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(email, password);
            }}
          >
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address <span className="text-red-600 font-bold">*</span>
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-600 font-bold">*</span>
              </label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className={'font-medium text-red-600 text-xs ml-2'}>{errorMessage}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href={routePaths.signup}>
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Don&apos;t have account yet?
                  </a>
                </Link>
              </div>

              <div className="text-sm">
                <Link href={routePaths.forgotPassword}>
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  submitForm(email, password);
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
