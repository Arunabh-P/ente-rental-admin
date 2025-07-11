import * as yup from 'yup';

const houseCategories = ['house', 'villa', 'flats-apartments', 'independent-builder-floors'] as const;
const furnishCategories = ['furnished', 'semi-furnished', 'not-furnished'] as const;
const facingDirections = [
  'north', 'south', 'east', 'west',
  'north-east', 'north-west', 'south-east', 'south-west'
] as const;

export const createHouseSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  location: yup.string().required('Location is required'),
  price: yup.number().required('Price is required').min(0),
  available: yup.boolean().required(),
  images: yup
    .array()
    .of(yup.string().required().url('Invalid image URL'))
    .min(1, 'At least one image is required')
    .required('Images are required'),
  propertyType: yup
    .string()
    .oneOf(houseCategories, 'Invalid property type')
    .required('Property type is required'),
  furnishing: yup
    .string()
    .oneOf(furnishCategories, 'Invalid furnishing type')
    .required('Furnishing is required'),

  bachelorsAllowed: yup.boolean().required(),
  carParking: yup.boolean().required(),

  carParkingCount: yup
    .number()
    .nullable()
    .defined()
    .when('carParking', {
      is: true,
      then: schema => schema.required().min(1),
      otherwise: schema => schema.nullable(),
    }),

  builtUpAreaSqFt: yup.number().required().min(100),
  carpetAreaSqFt: yup.number().nullable().defined().min(50),
  totalFloors: yup.number().nullable().defined().min(1),
  floorNumber: yup.number().nullable().defined().min(0),
  ageOfProperty: yup.number().nullable().defined().min(0),

  facing: yup.string().oneOf(facingDirections).nullable().defined(),

  bedrooms: yup.string().required('Number of bedrooms is required'),
  bathrooms: yup.string().required('Number of bathrooms is required'),
});
