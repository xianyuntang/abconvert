import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  placeholder?: string;
  value?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ prefix, placeholder, value, onChange, className, ...props }, ref) => {
    const [textInputValue, setTextInputValue] = useState<typeof value>(
      value || ''
    );
    useEffect(() => {
      if (value !== undefined && value !== textInputValue)
        setTextInputValue(value);
    }, [value, textInputValue]);

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
      setTextInputValue(evt.target.value);
      if (typeof onChange === 'function') onChange(evt);
    };

    return (
      <div className={twMerge('w-full flex text-black', className)}>
        {prefix && <span>{prefix}</span>}
        <input
          className="w-full h-full border-2"
          ref={ref}
          placeholder={placeholder}
          value={textInputValue}
          onChange={handleInputChange}
          {...props}
        />
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
