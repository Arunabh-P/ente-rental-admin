import React, { FC, useState } from "react";
import AvailableItems from "./available-item";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdCurrencyRupee } from "react-icons/md";
import { House } from "../types/house";
import { BiEditAlt } from "react-icons/bi";
type HouseDetailsProps = {
  data: House;
};
const HouseDetails: FC<HouseDetailsProps> = ({ data }) => {
  const [openEditor, setOpenEditor] = useState(false);
  const handleOpenEditor = () => {
    setOpenEditor(true);
  };
  return (
    <div className="text-start w-full lg:w-1/2">
      <h1 className="font-medium text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] capitalize xl:mt-3">
        {data?.title}
      </h1>
      <p className="text-[14] md:text-[16px] lg:text-[18px] font-normal flex items-center gap-2 mb-1 lg:mb-3">
        {" "}
        <CiLocationArrow1 />
        {data?.location}
      </p>
      <p className="text-[14] md:text-[16px] lg:text-[18px] font-normal mb-2">
        {data?.description}
      </p>
      <p className="text-[14px] md:text-[16px] lg:text-[18px] flex items-center gap-1 mb-2 bg-black font-medium text-white w-fit px-2 py-1">
        {" "}
        <MdCurrencyRupee />
        {data?.price} /-
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Category : <span className="font-normal">{data?.propertyType}</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Furnishing : <span className="font-normal">{data?.furnishing}</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Bathrooms :{" "}
          <span className="font-normal">{data?.bathrooms} Bathrooms</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Bedrooms :{" "}
          <span className="font-normal">{data?.bedrooms} Bedrooms</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Total Floors :{" "}
          <span className="font-normal">{data?.totalFloors} Floors</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Built-up area sqft :{" "}
          <span className="font-normal">{data?.builtUpAreaSqFt}</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Carpet area sqft :{" "}
          <span className="font-normal">{data?.carpetAreaSqFt}</span>
        </p>
        <p className="font-medium text-[14] md:text-[16px] lg:text-[18px]">
          Building Facing to :{" "}
          <span className="font-normal">{data?.facing}</span>
        </p>
      </div>

      <div className="flex gap-2 text-[14] md:text-[16px] lg:text-[18px] my-2">
        <AvailableItems
          text={"Bachelors"}
          available={data?.bachelorsAllowed ?? false}
        />
        <AvailableItems
          text={"Car Parking"}
          available={data?.carParking ?? false}
        />
      </div>
      <p className="font-medium text-[14] md:text-[16px] lg:text-[18px] mb-2">
        Car Parking :{" "}
        <span className="font-normal">Up to {data?.carParkingCount} Cars</span>
      </p>
      <button
        onClick={handleOpenEditor}
        className="mt-3 flex items-center gap-2  bg-white border-2 border-black rounded-lg text-black p-2 text-[16px] md:text-[18px] font-medium hover:bg-black hover:text-white cursor-pointer"
      >
        Edit Details <BiEditAlt />
      </button>
    </div>
  );
};

export default HouseDetails;
