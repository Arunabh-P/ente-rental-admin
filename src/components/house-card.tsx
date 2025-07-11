import React, { FC } from "react";
import { House } from "../types/house";
import { CiLocationArrow1 } from "react-icons/ci";
import AvailableItems from "./available-item";
import { useNavigate } from "react-router-dom";
import { truncateText } from "../helpers/truncate-text";

type houseProps = {
  house: House;
};
const HouseCard: FC<houseProps> = ({ house }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full sm:w-[300px] shadow-lg rounded-xl overflow-hidden cursor-pointer"
      onClick={() => navigate(`/houses/${house.slug}`)}
    >
      <div
        style={{
          backgroundImage: `url(${house.images[0]})`,
        }}
        className="bg-cover bg-center h-[300px] w-full sm:w-[300px] flex justify-between items-end px-2 py-2 gap-1"
      >
        <h3 className="text-black shadow-lg bg-white w-fit px-3 py-1 rounded-full flex items-center gap-2">
          <CiLocationArrow1 /> {truncateText(house.location, 16)}
        </h3>
        <h2 className="text-white shadow-lg bg-black w-fit px-3 py-1 rounded-full">
          ₹ {house.price}
        </h2>
      </div>
      <div className="p-4">
        <h2 className="font-medium">{truncateText(house.title, 30)}</h2>
        <p>{truncateText(house.description, 100)}</p>
        <p className="font-medium">
          Category : <span className="font-normal">{house.propertyType}</span>
        </p>
        <p className="font-medium">
          Furnishing : <span className="font-normal">{house.furnishing}</span>
        </p>

        <div className="flex gap-2">
          <AvailableItems
            text={"Bachelors"}
            available={house.bachelorsAllowed}
          />
          <AvailableItems text={"Car Parking"} available={house.carParking} />
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
