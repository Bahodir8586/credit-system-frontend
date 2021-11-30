import { useState } from 'react';

import InputComponent from '@/components/inputComponent';
import SelectComponent from '@/components/selectComponent';

const branches = [
  { value: 1, name: 'Tashkent City Branch' },
  { value: 2, name: 'Bukhara Branch' },
  { value: 3, name: 'Andijan Branch' },
];

const roles = [
  { value: 'manager', name: 'Manager' },
  { value: 'warehouseManager', name: 'Warehouse Manager' },
  { value: 'assistant', name: 'Assistant' },
];

export default function EmployeeForm({ submitForm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [branch, setBranch] = useState(branches[0]);
  const [role, setRole] = useState(roles[0]);
  return (
    <form
      className="max-w-3xl mx-auto space-y-8 divide-y divide-gray-200 border p-8 bg-gray-50 shadow-md rounded-lg"
      onSubmit={(e) => {
        e.preventDefault();
        submitForm(name, email, password, passwordConfirm, role.value, branch.value);
      }}
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <h3 className="text-xl text-center leading-6 font-medium text-gray-900">
            Create employee
          </h3>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <InputComponent
              input={{ label: 'Name', placeholder: 'Full name', value: name, type: 'text' }}
              onChange={(val) => setName(val)}
              error={undefined}
            />
            <InputComponent
              input={{ label: 'Email', placeholder: 'Email', value: email, type: 'email' }}
              onChange={(val) => setEmail(val)}
              error={undefined}
            />

            <InputComponent
              input={{
                label: 'Password',
                placeholder: 'password',
                value: password,
                type: 'password',
              }}
              onChange={(val) => setPassword(val)}
              error={undefined}
            />

            <InputComponent
              input={{
                label: 'Password Confirm',
                placeholder: 'Password Confirm',
                value: passwordConfirm,
                type: 'password',
              }}
              onChange={(val) => setPasswordConfirm(val)}
              error={undefined}
            />

            <SelectComponent
              label={'Role'}
              options={roles}
              value={role}
              onChange={(value) => setRole(value)}
            />

            <SelectComponent
              label={'Branch'}
              options={branches}
              value={branch}
              onChange={(value) => setBranch(value)}
            />
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => {
              e.preventDefault();
              submitForm(name, email, password, passwordConfirm, role.value, branch.value);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
