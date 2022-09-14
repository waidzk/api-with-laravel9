import React from 'react'

const Select = ({ disabled = false, options, className, ...props }) => {
  return (
    <select 
    disabled={disabled}
    className={`${className} w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
    {...props}>
        <option value="">
                    Select List
                </option>
        {options.map(option => (
                <option key={option.id} value={option.id}>
                    {option.label}
                </option>
            ))}
    </select>
  )
}

export default Select