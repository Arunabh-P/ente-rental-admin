import React, { useRef, useState } from 'react'
import House from '../features/house/House'
import AddHouse from '../features/house/AddHouse'
import { Drawer } from '../components/drawer'
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const addHouseRef = useRef<any>(null);
  const handleClose = () => {
    addHouseRef.current?.resetForm?.();
    setIsOpen(false);
  };
  return (
    <div className='px-5 md:px-12 lg:px-16 flex flex-col items-center'>
      <div className='w-full flex justify-between py-5'>
        <img src="../../public/assets/logo/ente-rental.png" alt="" className='w-[200px]' />
        <button
          onClick={() => setIsOpen(true)}
          className="border-2 border-black rounded-full text-black px-4 py-2 text-[12px] md:text-[14px] font-medium hover:bg-black hover:text-white cursor-pointer"
        >
          ADD NEW HOUSE DATA
        </button>
      </div>
      <Drawer position="bottom" isOpen={isOpen} onClose={handleClose}>
        <AddHouse ref={addHouseRef} onClose={handleClose} />
      </Drawer>
      <House />
    </div>
  )
}

export default Home