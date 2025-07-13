import React from 'react'
import HeightliteCard from '../components/highlite-card'

const Dashboard = () => {
  return (
    <div className='min-h-[90vh] w-full mt-5 lg:mt-8 sm:w-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
      <HeightliteCard text="View all Houses" goTo='/houses' />
    </div>
  )
}

export default Dashboard