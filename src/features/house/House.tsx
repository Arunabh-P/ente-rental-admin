import React from 'react'
import { useGetAllHousesQuery } from '../../services/houseApi'
import AvailableItems from '../../components/available-item';
import { CiLocationArrow1 } from "react-icons/ci";
const House = () => {
    const { data, isLoading, error } = useGetAllHousesQuery('')
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching houses</p>;
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-col-3 lg:grid-cols-4 gap-8'>{data?.data?.houses?.map((house) => (
            <div key={house._id} className='w-[300px] shadow-lg rounded-xl overflow-hidden'>
                <div style={{
                    backgroundImage: `url(${house.images[0]})`,
                }}
                    className='bg-cover bg-center h-[300px] w-[300px] flex justify-between items-end px-2 py-2 gap-1'
                >
                    <h3 className='text-black shadow-lg bg-white w-fit px-3 py-1 rounded-full flex items-center gap-2'><CiLocationArrow1 />  {house.location.length > 16 ? house.location.slice(0, 16) + '...' : house.location}</h3>
                    <h2 className='text-white shadow-lg bg-black w-fit px-3 py-1 rounded-full'>₹{house.price}</h2>
                </div>
                <div className='p-4'>
                    <h2 className='font-medium'>{house.title}</h2>
                    <p>{house.description}</p>
                    <p className='font-medium'>Category : <span className='font-normal'>{house.propertyType}</span></p>
                    <p className='font-medium'>Furnishing : <span className='font-normal'>{house.Furnishing}</span></p>

                    <div className='flex gap-2'>
                        <AvailableItems text={"Bachelors"} available={house.BachelorsAllowed} />
                        <AvailableItems text={"Car Parking"} available={house.CarParking} />
                    </div>
                </div>
            </div>
        ))} </div>
    )
}

export default House