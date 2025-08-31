import { FaSpinner } from "react-icons/fa";

const Loader = ({
  loading = false,
  label,
  loadingLabel = "Loading...",
  icon,
  type = "button",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      type={type}
      className={className}
      {...props}
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin text-xl" />
          <span>{loadingLabel}</span>
        </>
      ) : (
        <>
          {icon && <span className="text-xl">{icon}</span>}
          <span>{label}</span>
        </>
      )}
    </button>
  );
};

export default Loader;
