import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 font-medium rounded-lg shadow-sm hover:from-blue-200 hover:to-purple-200 hover:shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300"
    >
      {children}
    </button>
  );
};

export default Button;
