type houseCategory =
  | "house"
  | "villa"
  | "flats-apartments"
  | "independent-builder-floors";
type furnishCategory = "furnished" | "semi-furnished" | "not-furnished";
export type facingDirection =
  | "north"
  | "south"
  | "east"
  | "west"
  | "north-east"
  | "north-west"
  | "south-east"
  | "south-west";


export interface House {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  available: boolean;
  images: string[];
  propertyType: houseCategory;
  furnishing: furnishCategory;
  bachelorsAllowed: boolean;
  carParking: boolean;
  carParkingCount: number | null;
  builtUpAreaSqFt: number;
  carpetAreaSqFt: number | null;
  totalFloors: number | null;
  floorNumber: number | null;
  ageOfProperty: number | null;
  facing: facingDirection | null;
  bedrooms: string;
  bathrooms: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}


export interface PaginatedHouseResponse {
  success: boolean;
  message: string;
  data: {
    houses: House[];
    total: number;
    page: number;
    totalPages: number;
  };
}
export interface HouseResponse {
  success: boolean;
  message: string;
  data: House;
}

export interface CreateHouseInput
  extends Omit<House, "_id" | "createdAt" | "updatedAt" | "slug"> {}
export interface UpdateHouseInput extends Partial<CreateHouseInput> {
  _id: string;
}
