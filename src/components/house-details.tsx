import React, { FC } from 'react'
import AvailableItems from './available-item'
import { CiLocationArrow1 } from 'react-icons/ci'
import { MdCurrencyRupee } from 'react-icons/md'
import { House } from '../types/house'
type HouseDetailsProps = {
    data:House
}
const HouseDetails:FC<HouseDetailsProps> = ({data}) => {
  return (
   <div className="text-start w-full lg:w-1/2">
        <h1 className="font-medium text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] capitalize mb-2 xl:mt-3">{data?.title}</h1>
        <p className="text-[14] md:text-[16px] lg:text-[18px] font-normal mb-2">{data?.description}</p>
        <p className="text-[14] md:text-[16px] lg:text-[18px] font-normal flex items-center gap-2"> <CiLocationArrow1 />{data?.location}</p>
        <p className="text-[14] md:text-[16px] lg:text-[18px] font-normal flex items-center gap-1 mb-2"> <MdCurrencyRupee />{data?.price} /-</p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Category :{" "}
          <span className="font-normal">{data?.propertyType}</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Furnishing :{" "}
          <span className="font-normal">{data?.furnishing}</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Bathrooms :{" "}
          <span className="font-normal">{data?.bathrooms} Bathrooms</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px] mb-2">
          Bedrooms :{" "}
          <span className="font-normal">{data?.bedrooms} Bedrooms</span>
        </p>
        <div className="flex gap-2 text-[14] md:text-[16px] lg:text-[18px]">
          <AvailableItems
            text={"Bachelors"}
            available={data?.bachelorsAllowed ?? false}
          />
          <AvailableItems
            text={"Car Parking"}
            available={data?.carParking ?? false}
          />
        </div>

      </div>
  )
}

export default HouseDetails