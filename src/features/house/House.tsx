import React from 'react'
import { useGetAllHousesQuery } from '../../services/houseApi'

const House = () => {
    const { data, isLoading, error } = useGetAllHousesQuery('')
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching houses</p>;
    return (
        <div>{data?.data?.houses?.map((house) => (
            <div key={house._id}>
                <h3 className='text-red-600'>{house.title}</h3>
                <p>{house.location} - ₹{house.price}</p>
                <p>{house.propertyType} and {house.Furnishing}</p>
            </div>
        ))} </div>
    )
}

export default House