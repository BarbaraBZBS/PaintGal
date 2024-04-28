import React from 'react'

export default function Button({children,isDisabled}) {
  return (
    <button aria-disabled={isDisabled} className={`p-[1rem] bg-pgblue text-white border-pgnavy rounded-lg  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pgyellow hover:text-black'}`} onClick={(e)=> isDisabled?
    e.preventDefault() : ""}>
        {children}
    </button>
  )
  // "transition-all duration-300 ease-in-out  hover:translate-y-[7px] hover:shadow-xl "
  

}
