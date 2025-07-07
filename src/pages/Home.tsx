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
    <div>
       <button
        onClick={() => setIsOpen(true)}
        className="border-2 border-black rounded-full text-black px-4 py-2 text-[16px] md:text-[18px] font-normal hover:bg-black hover:text-white cursor-pointer"
      >
        ADD NEW HOUSE DATA
      </button>
      <Drawer position="bottom" isOpen={isOpen} onClose={handleClose}>
        <AddHouse ref={addHouseRef}/>
      </Drawer>
        <House/>
    </div>
  )
}

export default Home