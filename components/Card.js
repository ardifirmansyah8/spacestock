const Card = ({ data = {}, onClick }) => {
  return (
    <div
      className="flex flex-col cursor-pointer rounded overflow-hidden shadow-lg border border-gray-400"
      style={{ maxHeight: 350 }}
      onClick={() => onClick(data.name)}
    >
      <img
        className="w-full"
        src={data.images.primary}
        alt="image asset"
        style={{ height: 185 }}
      />
      <div className="p-4 flex-1 flex flex-col" style={{ minHeight: 160 }}>
        <div className="font-bold text-base mb-2">{data.name}</div>
        <div className="flex-1 text-gray-700 text-xs mb-4">
          {data.description !== ''
            ? data.description.length <= 100
              ? data.description
              : data.description.substring(0, 100) + '...'
            : '-'}
        </div>
        <div className="inline-flex self-start bg-gray-400 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            ></path>
          </svg>
          {data.address && data.address.city}
        </div>
      </div>
    </div>
  );
};

export default Card;
