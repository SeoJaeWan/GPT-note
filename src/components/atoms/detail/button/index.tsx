interface ButtonProps {
  children: React.ReactNode;
  color: "red" | "blue";
  className?: string;

  //
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, color, className = "", onClick } = props;
  const bgColor =
    color === "red"
      ? "bg-red-600 hover:bg-red-500"
      : "bg-blue-600 hover:bg-blue-500";

  return (
    <button
      className={`py-2 px-4 rounded ${bgColor} ${className}`}
      //
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
