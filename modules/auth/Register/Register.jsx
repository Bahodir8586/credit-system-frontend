import React, { useState } from 'react';
import Link from 'next/link';
import routePaths from '@/route-paths';

const Register = ({ submitForm, errorMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-4 shadow sm:rounded-lg sm:px-10">
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              submitForm(name, email, password, passwordConfirm);
            }}
          >
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Get your free account
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full name <span className="text-red-600 font-bold">*</span>
              </label>
              <div className="mt-1">
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password Confirm <span className="text-red-600 font-bold">*</span>
              </label>
              <div className="mt-1">
                <input
                  name="passwordConfirm"
                  type="password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  autoComplete="off"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className={'font-medium text-red-600 text-xs ml-2'}>{errorMessage}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href={routePaths.signin}>
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Already have an account?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  submitForm(name, email, password, passwordConfirm);
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
