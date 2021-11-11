import { ExclamationCircleIcon } from '@heroicons/react/solid';

export default function InputComponent({ input, onChange, error }) {
  const { label, value, placeholder, type } = input;
  return (
    <div className="flex items-center justify-between">
      <label className="w-1/3 text-sm font-medium text-gray-700">{label}</label>
      <div className="w-2/3 mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          name={label}
          className={`w-full ${
            error
              ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-300'
              : 'border-gray-300 text-gray-900 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-300'
          }  focus:outline-none  sm:text-sm rounded-md`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
