import * as yup from 'yup';

const houseCategories = ['house', 'villa', 'flats-apartments', 'independent-builder-floors'] as const;
const furnishCategories = ['furnished', 'semi-furnished', 'not-furnished'] as const;
const facingDirections = [
  'north', 'south', 'east', 'west',
  'north-east', 'north-west', 'south-east', 'south-west'
] as const;

export const createHouseSchema = yup.object({
  title: yup.string().required('Please enter Title') .min(3, 'Please enter a description of 3 or more').max(80,'max 80 charectors'),
  description: yup.string().required('Please enter Description').min(100,'Please enter a description of 100 or more').max(1000,'max 1000 charectors'),
  location: yup.string().required('Please enter a Location'),
  price: yup.number().required('Please enter a Price').min(0),
  available: yup.boolean().required(),
  images: yup
    .array()
    .of(yup.string().required().url('Invalid image URL'))
    .min(1, 'Add at least one image')
    .required('Add at least one image'),
  propertyType: yup
    .string()
    .oneOf(houseCategories, 'Please Select Property Type')
    .required('Please Select Property Type'),
  furnishing: yup
    .string()
    .oneOf(furnishCategories, 'Please Select furnishing type')
    .required('Please Select Furnishing'),

  bachelorsAllowed: yup.boolean().required(),
  carParking: yup.boolean().required(),

  carParkingCount: yup
    .number()
    .nullable()
    .defined()
    .when('carParking', {
      is: true,
      then: schema =>   schema
        .required('Please enter the number of car parking spots.')
        .min(1, 'Please enter the number of car parking spots.'),
      otherwise: schema => schema.nullable(),
    }),

  builtUpAreaSqFt: yup.number().required('Please enter built up ara SqFt').min(100, 'Value must be at least 100.'),
  carpetAreaSqFt: yup.number().nullable().defined().min(50, 'Value must be at least 50.'),
  totalFloors: yup.number().nullable().defined().min(1, 'Value must be at least 1.'),
  floorNumber: yup.number().nullable().defined().min(0),
  ageOfProperty: yup.number().nullable().defined().min(0),

  facing: yup.string().oneOf(facingDirections).nullable().defined(),

  bedrooms: yup.string().required('please enter Number of bedrooms'),
  bathrooms: yup.string().required('please enter Number of bathrooms'),
});
