const Input = ({ className, withIcons, onChange }) => {
  return (
    <div className={`relative text-gray-700 ${className}`}>
      {withIcons && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 text-gray-500">
          <svg
            viewBox="0 0 20 20"
            className="fill-current h-5 w-5"
            style={{ top: 9, left: 8 }}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )}

      <input
        className={`shadow-sm appearance-none border border-gray-400 rounded-lg w-full py-2 px-3 leading-tight focus:outline-none ${
          withIcons && 'pl-8'
        }`}
        type="text"
        placeholder="Search"
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
