import type { ChangeEvent } from 'react';

interface SelectProps {
    defaultValue?: string;
    placeholder?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    options?: string[];
    change?: (value: string) => Promise<void>;
}

function Select({ defaultValue, placeholder, name, required, disabled, className, options, change }: SelectProps) {
  async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    await change?.(event.currentTarget.value);
  }

  return (
    <>
      <select defaultValue={defaultValue} disabled={disabled} name={name} required={required} onChange={handleChange} className={`select ${className}`}>
        {placeholder && <option disabled selected value="">{placeholder}</option>}
        {options?.map(option =>
          <option value={option} key={option}>
            {option}
          </option>
        )}
      </select>
    </>
  );
}

export default Select;
