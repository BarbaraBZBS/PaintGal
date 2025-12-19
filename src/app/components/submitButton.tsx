import React from 'react'
import { useAnimate } from "motion/react";

export default function SubmitButton({children,isDisabled}: {children: React.ReactNode,isDisabled: boolean}) {
    const [scope, animate] = useAnimate();
    
    const onButtonClick = () => {
    animate([
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
    ])
};

  return (
    <div ref={scope}>
    <button aria-disabled={isDisabled} className={`p-[1rem] bg-pgblue text-white border-pgnavy border-[0.3rem] rounded-lg transition-colors m-[1rem] ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-pgyellow hover:border-pgnavy hover:border-[0.3rem] hover:text-black'}`} onClick={(e)=> isDisabled?
    e.preventDefault() : onButtonClick()}>
        {children}
    </button>
    </div>
  )
  

}
