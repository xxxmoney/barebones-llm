import type { ChangeEvent } from 'react';

interface SelectProps {
    defaultValue?: string;
    placeholder?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    options?: string[];
    change?: (value: string) => Promise<void>;
}

function Select({ defaultValue, placeholder, name, required, disabled, options, change }: SelectProps) {
  async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    await change?.(event.currentTarget.value);
  }

  return (
    <>
      <select defaultValue={defaultValue ?? placeholder} disabled={disabled} name={name} required={required} onChange={handleChange} className="select validator">
        {placeholder && <option disabled>{placeholder}</option>}
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
