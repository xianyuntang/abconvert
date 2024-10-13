import { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 font-medium text-blue-800 shadow-sm transition duration-300 ease-in-out hover:-translate-y-0.5 hover:from-blue-200 hover:to-purple-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

export default Button;
