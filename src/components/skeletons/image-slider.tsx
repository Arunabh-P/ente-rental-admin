import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ImageSliderSkelton = () => {
  return (
    <div className='overflow-hidden rounded-xl h-[330px] w-[330px] sm:w-[400px] sm:h-[400px] lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px]'>
    <Skeleton  className='mb-3 rounded-top-xl overflow-hidden h-full' borderRadius={14}  />
 </div>
  )
}

export default ImageSliderSkelton