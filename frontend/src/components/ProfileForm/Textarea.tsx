import React from "react";

type TextareaProps = {
  label: string;
  name: string;
  value?: string | string[];
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};
const Textarea = ({
  label,
  value,
  name,
  handleChange,
  placeholder,
}: TextareaProps) => {
  return (
    <div>
      <label htmlFor='firstname' className='text-sm'>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className='shadow-sm p-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mt-1 block w-full border border-gray-300 rounded-md'
      ></textarea>
    </div>
  );
};

export default Textarea;
