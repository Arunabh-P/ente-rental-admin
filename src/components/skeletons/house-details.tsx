import React from 'react'
import Skeleton from 'react-loading-skeleton'

const HouseDetailSkelton = () => {
  return (
    <div className="text-start w-full lg:w-1/2">
     <Skeleton width={300} height={25} className='xl:mt-3 mb-2'/>
     <Skeleton width={250} height={20} className='lg:mb-3'/>
     <Skeleton width={150} className='mb-2 px-2 py-1'/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Skeleton width={230} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={180} height={20} />
        <Skeleton width={190} height={20} />
        <Skeleton width={200} height={20} />
        <Skeleton width={260} height={20} />
        <Skeleton width={220} height={20} />
        <Skeleton width={180} height={20} />
      </div>

      <div className="flex gap-2 text-[14] md:text-[16px] lg:text-[18px] my-2">
        <Skeleton width={200} height={20} />
        <Skeleton width={200} height={20} />
      </div>
     <Skeleton width={230} height={20} className='mb-2'/>
     <Skeleton width={240} height={30} className='mt-3'/>
    </div>
  )
}

export default HouseDetailSkelton