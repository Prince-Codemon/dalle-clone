import React from 'react'

const FormField = ({labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        
        <label htmlFor={name} className="text-gray-900 block font-medium text-sm capitalize">
          {labelName}
        </label>
 {
    isSurpriseMe && (
      <button
        type="button"
        className=" font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-md text-[#666E75] hover:bg-[#F5F5F7] hover:text-[#222328] "
        onClick={handleSurpriseMe}
      >
        Surprise me
      </button>
    )
 }

      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="w-full border border-[#ECECF1] rounded-md px-4 py-2 focus:outline-none focus:border-[#6469FF] focus:ring-1 focus:ring-[#6469FF] text-gray-900 "
      />

    </div>
  )
}

export default FormField