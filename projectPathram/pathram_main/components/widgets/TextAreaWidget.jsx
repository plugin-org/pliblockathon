import React from 'react'

function TextAreaWidget({
  type,
  placeholder,
  value,
  onChangeFunction,
  width = "full",
}) {
  return (
    <textarea

    rows={5}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChangeFunction}
      className={`placeholder-customWhite placeholder-opacity-60 outline-none w-${width} px-4 py-1 shadow-sm rounded-sm focus:shadow-none duration-150 border border-secondary bg-actionBlack border-opacity-60 font-secondaryTypefaceDmSans text-customWhite`}
    />
  );
}

export default TextAreaWidget