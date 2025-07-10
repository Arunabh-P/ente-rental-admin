import React, { useRef, useState } from 'react'
import House from '../features/house/House'
import AddHouse from '../features/house/AddHouse'
import { Drawer } from '../components/drawer'
import { GrAdd } from 'react-icons/gr'
import { LuFilter } from 'react-icons/lu'
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const addHouseRef = useRef<any>(null);
  const [filterOpen,setFilterOpen]= useState(false)

  const handleClose = () => {
    addHouseRef.current?.resetForm?.();
    setIsOpen(false);
  };
  const handleOpenFilter = ()=>{
    setFilterOpen(!filterOpen)
  }
  return (
    <div className=' flex flex-col items-center'>
      <div className='w-full flex justify-end py-4'>
        <div className='fixed z-10 gap-2 bottom-2 flex'>
          <button onClick={handleOpenFilter} className='flex items-center gap-2  bg-black border-2 border-black rounded-full text-white p-3 text-[16px] md:text-[18px] font-medium hover:bg-white hover:text-black cursor-pointer'>
            <LuFilter />
          </button>
          <button onClick={() => setIsOpen(true)} className='flex items-center gap-2  bg-black border-2 border-black rounded-full text-white px-4 py-2 text-[12px] md:text-[14px] font-medium hover:bg-white hover:text-black cursor-pointer'>
            <GrAdd />
            ADD NEW HOUSE
          </button>
        </div>
      </div>
      <Drawer position="bottom" isOpen={isOpen} onClose={handleClose}>
        <AddHouse ref={addHouseRef} onClose={handleClose} />
      </Drawer>
      <House filterOpen={filterOpen} />
    </div>
  )
}

export default Home