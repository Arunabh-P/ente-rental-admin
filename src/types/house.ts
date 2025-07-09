type houseCategory = '1RK' | '1BHK' | '2BHK' | '3BHK' | '4BHK' | 'Studio'
type furnishCategory = 'full' | 'semi' | 'no'

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
    bedrooms: number;
    bathrooms: number;
    createdAt: string;
    updatedAt: string;
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

export interface CreateHouseInput extends Omit<House, '_id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateHouseInput extends Partial<CreateHouseInput> {
  id: string;
}
