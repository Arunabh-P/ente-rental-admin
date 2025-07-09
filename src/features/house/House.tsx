import { useState } from "react";
import { useGetAllHousesQuery } from "../../services/houseApi";
import AvailableItems from "../../components/available-item";
import { CiLocationArrow1 } from "react-icons/ci";
import PaginationControls from "../../components/pagination-control";
import { useDebounce } from "../../helpers/use-debounce";
import SearchAndFilter from "../../components/search-and-filter";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const House = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [carParking, setCarParking] = useState(false);
  const [bachelorsAllowed, setBachelorsAllowed] = useState(false);
  const [available, setAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [range, setRange] = useState<[number, number]>([100, 800]);
  const debouncedRange = useDebounce(range, 500);

  const handleChange = (values: [number, number]) => {
    setRange(values);
  };
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const { data, isLoading, error } = useGetAllHousesQuery({
    page,
    limit,
    search: debouncedSearchValue,
    propertyType,
    furnishing, carParking: carParking.toString(),
    bachelorsAllowed: bachelorsAllowed.toString(),
    available: available.toString(),
    sortBy,
    priceMin: debouncedRange[0],
    priceMax: debouncedRange[1],
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error fetching houses</p>;
  const totalItems = data?.data?.total || 0;
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const handleChangeLimit = (limit: number) => {
    setLimit(limit);
  };


  return (
    <div className="flex flex-col items-center">

      <SearchAndFilter
        fields={[
          {
            type: "search",
            name: "searchVal",
            label: "Search by title or location",
            placeholder: "Search by title or location",
            value: searchValue,
            onChange: (val) => {
              setSearchValue(val);
              setPage(1);
            },
          },
          {
            type: "select",
            name: "property",
            label: "Property Type",
            value: propertyType,
            onChange: (val) => {
              setPropertyType(val);
              setPage(1);
            },
            options: [
              { value: "", label: "All Type Properties" },
              { value: "1RK", label: "1RK" },
              { value: "Studio", label: "Studio" },
              { value: "1BHK", label: "1BHK" },
              { value: "2BHK", label: "2BHK" },
              { value: "3BHK", label: "3BHK" },
              { value: "4BHK", label: "4BHK" },
            ],
          },
          {
            type: "select",
            name: "furnish",
            label: "Furnishing",
            value: furnishing,
            onChange: (val) => {
              setFurnishing(val);
              setPage(1);
            },
            options: [
              { value: "", label: "All Type Furnished" },
              { value: "full", label: "Fully Furnished" },
              { value: "semi", label: "Semi Furnished" },
              { value: "no", label: "Not furnished" },
            ],
          },
          {
            type: "select",
            name: "sortBy",
            label: "Sort By",
            value: sortBy,
            onChange: (val) => {
              setSortBy(val);
              setPage(1); 
            },
            options: [
              { value: "createdAt", label: "Newest First" },
              { value: "-createdAt", label: "Oldest First" },
              { value: "price", label: "Price: High to Low" },
              { value: "-price", label: "Price: Low to High" },
              { value: "bedrooms", label: "Bedrooms: Most First" },
              { value: "-bedrooms", label: "Bedrooms: Least First" },
            ],
          },
          {
            type: "range",
            name: "priceRange",
            label: "Price Range",
            value: range,
            min: 0,
            max: 1000,
            step: 10,
            onChange: (val: [number, number]) => {
              setRange(val);
              setPage(1);
            },
          },

          {
            type: 'checkbox',
            name: 'carParking',
            label: 'Car Parking',
            checked: carParking,
            onChange: setCarParking,
          },
          {
            type: 'checkbox',
            name: 'bachelorsAllowed',
            label: 'Bachelors Allowed',
            checked: bachelorsAllowed,
            onChange: setBachelorsAllowed,
          },
          {
            type: 'checkbox',
            name: 'available',
            label: 'Only Available',
            checked: available,
            onChange: setAvailable,
          },


        ]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-col-3 lg:grid-cols-4 gap-8 mt-5">
        {data?.data?.houses?.map((house) => (
          <div
            key={house._id}
            className="w-[300px] shadow-lg rounded-xl overflow-hidden"
          >
            <div
              style={{
                backgroundImage: `url(${house.images[0]})`,
              }}
              className="bg-cover bg-center h-[300px] w-[300px] flex justify-between items-end px-2 py-2 gap-1"
            >
              <h3 className="text-black shadow-lg bg-white w-fit px-3 py-1 rounded-full flex items-center gap-2">
                <CiLocationArrow1 />{" "}
                {house.location.length > 16
                  ? house.location.slice(0, 16) + "..."
                  : house.location}
              </h3>
              <h2 className="text-white shadow-lg bg-black w-fit px-3 py-1 rounded-full">
                ₹ {house.price}
              </h2>
            </div>
            <div className="p-4">
              <h2 className="font-medium">{house.title}</h2>
              <p>{house.description}</p>
              <p className="font-medium">
                Category :{" "}
                <span className="font-normal">{house.propertyType}</span>
              </p>
              <p className="font-medium">
                Furnishing :{" "}
                <span className="font-normal">{house.furnishing}</span>
              </p>

              <div className="flex gap-2">
                <AvailableItems
                  text={"Bachelors"}
                  available={house.bachelorsAllowed}
                />
                <AvailableItems
                  text={"Car Parking"}
                  available={house.carParking}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationControls
        page={page}
        limit={limit}
        totalItems={totalItems}
        onPageChange={handleChangePage}
        onLimitChange={handleChangeLimit}
      />
    </div>
  );
};

export default House;
