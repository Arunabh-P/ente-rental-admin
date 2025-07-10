import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HouseCardSkelton = () => {
  return (
    <div className='w-full sm:w-[300px] shadow-lg rounded-xl overflow-hidden'>
      <Skeleton height={300} className='mb-3 rounded-top-xl overflow-hidden' borderRadius={14}  />
      <div className='p-2 px-4 pb-4'>
        <Skeleton count={2} />
        <Skeleton width={200} />
        <Skeleton width={200} />
        <Skeleton width={150} />
      </div>
    </div>
  )
}

export default HouseCardSkelton