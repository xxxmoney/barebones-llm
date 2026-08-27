import type { ChangeEvent } from 'react';

interface SelectProps {
    value?: string;
    placeholder?: string;
    options?: string[];
    change: (value: string) => Promise<void>;
}

function Select({ value, placeholder, options, change }: SelectProps) {
  async function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    await change(event.currentTarget.value);
  }

  return (
    <>
      <select defaultValue={value ?? placeholder} onChange={handleChange} className="select">
        <option disabled>{value}</option>
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
