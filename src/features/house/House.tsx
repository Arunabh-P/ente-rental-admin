import { FC, useEffect, useState } from "react";
import { useGetAllHousesQuery } from "../../services/houseApi";
import PaginationControls from "../../components/pagination-control";
import { useDebounce } from "../../helpers/use-debounce";
import SearchAndFilter from "../../components/search-and-filter";
import HouseCard from "../../components/house-card";
import HouseCardSkelton from "../../components/skeletons/house-card";
import { furnishCategory, houseType } from "../../constants/house";
type HouseProps = {
  filterOpen: boolean
}
const House: FC<HouseProps> = ({ filterOpen }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [carParking, setCarParking] = useState(false);
  const [bachelorsAllowed, setBachelorsAllowed] = useState(false);
  const [available, setAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [range, setRange] = useState<[number, number]>([100, 800]);
  const debouncedRange = useDebounce(range, 500);
  const debouncedSearchValue = useDebounce(searchValue, 1000);
  useEffect(() => {
    if (filterOpen) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [filterOpen]);
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
  if (isLoading) return <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <HouseCardSkelton key={index} />
    ))}

  </div>;
  if (error) return <p>Error fetching houses</p>;
  const totalItems = data?.data?.total || 0;
  const handleChangePage = (page: number) => {
    setPage(page);
  };
  const handleChangeLimit = (limit: number) => {
    setLimit(limit);
  };
  const houseOptions = [{ value: "", label: "All Type Properties" }, ...houseType]
  const furnishOptions = [{ value: "", label: "All Type Furnished" }, ...furnishCategory]
  return (
    <div className="flex flex-col items-center justify-center w-full">

      {filterOpen && <SearchAndFilter
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
            options: houseOptions,
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
            options: furnishOptions,
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
              { value: "-createdAt", label: "Newest First" },
              { value: "createdAt", label: "Oldest First" },
              { value: "-price", label: "Price: High to Low" },
              { value: "price", label: "Price: Low to High" },
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
      />}
      <div className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 ">
        {data?.data?.houses?.map((house) => (
          <HouseCard house={house} key={house._id} />
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
