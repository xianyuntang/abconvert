import React, { ChangeEvent, SelectHTMLAttributes, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { text: string; value: string }[];
}

const Select = ({ options, onSelect, className }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    setSelectedOption(value);
    if (typeof onSelect === 'function') onSelect(evt);
  };

  return (
    <div className={twMerge('text-black', className)}>
      <select value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
