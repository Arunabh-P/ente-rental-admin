import React, { FC } from 'react'
interface ItemProp {
    available:boolean;
    text:string
}
const AvailableItems:FC<ItemProp> = ({
    available,text
}) => {
  return (
    <div className='flex gap-2 items-center'>
        <div className={`w-[10px] h-[10px] rounded-full shadow-lg ${available ? 'bg-green-300':'bg-gray-400'}`}></div>
        <p >{text}</p>
    </div>
  )
}

export default AvailableItems