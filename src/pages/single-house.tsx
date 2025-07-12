import { useParams } from "react-router-dom";
import { useGetHouseBySlugQuery } from "../services/houseApi";
import ImageSlider from "../components/image-slider";
import HouseDetails from "../components/house-details";
import ImageSliderSkelton from "../components/skeletons/image-slider";
import HouseDetailSkelton from "../components/skeletons/house-details";

const SingleHouse = () => {
  const { slug } = useParams();
  const { data, isLoading, error, isSuccess } = useGetHouseBySlugQuery(slug);
  
  const images = data?.images || [];
  if (isLoading) return <div className="w-full gap-3 md:gap-5 lg:gap-8 flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:items-start mt-5 lg:mt-8">
      <ImageSliderSkelton/>
      <HouseDetailSkelton/>
    </div>
  if (error) return <p>Failed to load house details</p>;

  return (
    <div className="w-full gap-3 md:gap-5 lg:gap-8 flex flex-col items-center justify-center lg:flex-row lg:justify-start lg:items-start mt-5 lg:mt-8">
      <ImageSlider images={images} />
      {data && <HouseDetails data={data} />}
    </div>
  );
};

export default SingleHouse;
