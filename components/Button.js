const Button = ({ className = '', label, variant, disabled, onClick }) => {
  const getColor = () => {
    let color = '';
    switch (variant) {
      case 'primary':
        color = 'bg-blue-500 hover:bg-blue-400 text-white';
        break;
      default:
        color = 'bg-white hover:bg-gray-100 text-gray-800';
    }
    return color;
  };

  return (
    <button
      className={`${getColor()} py-2 px-4 border border-gray-400 rounded shadow ${className} ${
        disabled && 'opacity-50 cursor-not-allowed'
      }`}
      style={{ minWidth: 100 }}
      disabled={disabled}
      onClick={() => onClick()}
    >
      {label}
    </button>
  );
};

export default Button;
