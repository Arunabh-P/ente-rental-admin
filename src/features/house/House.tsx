import React from 'react'
import { useGetAllHousesQuery } from '../../services/houseApi'

const House = () => {
    const { data, isLoading, error } = useGetAllHousesQuery('')
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching houses</p>;
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-col-3 lg:grid-cols-4 gap-8'>{data?.data?.houses?.map((house) => (
            <div key={house._id} className='w-[300px]'>
                <div style={{
                    backgroundImage: `url(${house.images[0]})`,
                }}
                    className='bg-cover bg-center h-[300px] w-[300px] rounded-lg'
                >
                </div>
                <h3 className='text-red-600'>{house.title}</h3>
                <p>{house.location} - ₹{house.price}</p>
                <p>{house.propertyType} and {house.Furnishing}</p>
            </div>
        ))} </div>
    )
}

export default House