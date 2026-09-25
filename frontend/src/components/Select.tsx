import type { ChangeEvent } from 'react';

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    defaultValue?: string;
    value?: string;
    placeholder?: string;
    name?: string;
    id?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    options?: Option[];
    change?: (value: string) => Promise<void>;
}

function Select({ defaultValue, value, placeholder, name, id, required, disabled, className, options, change }: SelectProps) {
  async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    await change?.(event.currentTarget.value);
  }

  return (
    <>
      <select key={defaultValue ?? 'reset'} defaultValue={defaultValue ?? ''} value={value} disabled={disabled} name={name} id={id} required={required} onChange={handleChange} className={`select ${className}`}>
        {placeholder && <option disabled value="">{placeholder}</option>}
        {options?.map(option =>
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        )}
      </select>
    </>
  );
}

export default Select;
