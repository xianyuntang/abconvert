import React, {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  value?: string;
}

const TextField = forwardRef<HTMLTextAreaElement, TextFieldProps>(
  ({ placeholder, value, onChange, className, ...props }, ref) => {
    const [textInputValue, setTextInputValue] = useState(value || '');

    useEffect(() => {
      if (value !== undefined && value !== textInputValue)
        setTextInputValue(value);
    }, [value, textInputValue]);

    const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
      setTextInputValue(evt.target.value);
      if (typeof onChange === 'function') onChange(evt);
    };

    return (
      <div className={twMerge('w-full text-black', className)}>
        <textarea
          className="size-full resize-none border-2"
          ref={ref}
          placeholder={placeholder}
          value={textInputValue}
          onChange={handleTextareaChange}
          {...props}
        />
      </div>
    );
  }
);

TextField.displayName = 'TextArea';

export default TextField;
