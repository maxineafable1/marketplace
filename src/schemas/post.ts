import { z } from "zod";

export const bodyTypes = [
  'Sedan',
  'Hatchback',
  'Coupe',
  'SUV',
  'Pickup Truck',
  'MPV',
  'Crossover',
  'AUV',
  'Van',
  'Minivan',
  'Convertible',
  'Station Wagon',
] as const

export const transmissions = [
  'Manual transmission',
  'Automatic transmission',
  'CVT',
  'DCT',
] as const

export const fuelTypes = [
  'Gasoline',
  'Diesel',
  'Electric',
  'Hybrid',
] as const

export const vehicleConditions = [
  'Brand new',
  'Used',
] as const

export const MAX_NUM_FILES = 2
const MAX_FILE_SIZE = 5_000_000 // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const MAX_PRICE = 999999999 // 999 Million
export const MAX_MILEAGE = 1000000 // 1 Million

const category = [
  'vehicle',
  'parts',
] as const

const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Please enter a title')
    .max(200, 'Must not exceed 200 characters'),
  desc: z
    .string()
    .trim()
    .min(1, 'Please enter a description')
    .max(1000, 'Must not exceed 1000 characters'),
  price: z
    .string()
    .transform(val => +val.replace(/₱|,/g, ''))
    .pipe(z
      .number()
      .int()
      .positive('Please enter a valid price')
      .lte(MAX_PRICE, `Must be ₱1 to ₱${MAX_PRICE.toLocaleString()}`)
    ),
  images: z
    .any()
    .refine(files => files?.length > 0, 'Please upload at least one photo')
    .refine(files => files?.length <= MAX_NUM_FILES, `You can only upload ${MAX_NUM_FILES} photos`)
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB`)
    .refine(
      files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpeg, .jpg, .png and .webp files are supported'
    ),
  category: z.enum(category, {message: 'categ'}),
  condition: z.enum(vehicleConditions, { message: 'Please select a condition' })
})

const vehicleSchema = z.object({
  make: z
    .string()
    .trim()
    .min(1, 'Please enter a make')
    .max(50, 'Must not exceed 50 characters'),
  model: z
    .string()
    .trim()
    .min(1, 'Please enter a model')
    .max(50, 'Must not exceed 50 characters'),
  year: z
    .any()
    .refine(val => val != null, 'Please select a year')
    .refine(val => +val <= new Date().getFullYear() + 1, 'Please select a valid year'),
  mileage: z
    .string()
    .transform(val => val ? +val : -1)
    .pipe(z
      .number()
      .int()
      .nonnegative('Please enter a valid mileage')
      .lte(MAX_PRICE, `Must be 0 to ${MAX_MILEAGE}`)
    ),
  type: z.enum(bodyTypes, { message: 'Please select a body type' }),
  extColor: z
    .string()
    .trim()
    .min(1, 'Please enter an exterior color')
    .max(50, 'Must not exceed 50 characters'),
  intColor: z
    .string()
    .trim()
    .min(1, 'Please enter an interior color')
    .max(50, 'Must not exceed 50 characters'),
  trans: z.enum(transmissions, { message: 'Please select a transmission' }),
  engine: z
    .string()
    .trim()
    .min(1, 'Please enter the engine of this vehicle')
    .max(50, 'Must not exceed 50 characters'),
  fuel: z.enum(fuelTypes, { message: 'Please select a fuel type' }),
  cleanTitle: z
    .boolean()
    .optional()
    .default(false),
  stock: z
    .boolean()
    .optional()
    .default(false),
})

export const vehiclePostSchema = postSchema.merge(vehicleSchema)

// export const postUnionSchema = z.discriminatedUnion('category', [
//   z.object({
//     category: z.literal('vehicle'),
//     title: z
//       .string()
//       .trim()
//       .min(1, 'Please enter a title')
//       .max(200, 'Must not exceed 200 characters'),
//     desc: z
//       .string()
//       .trim()
//       .min(1, 'Please enter a description')
//       .max(1000, 'Must not exceed 1000 characters'),
//     price: z
//       .number()
//       .int()
//       .finite()
//       .nonnegative('Price must be a non negative number')
//       .lte(1_000_000_000, 'Please enter a valid price'),
//     images: z
//       .string()
//       .array()
//       .min(1, 'Images can\'t be empty')
//       .max(10, 'Can only have 10 images'),
//     make: z
//       .string()
//       .trim()
//       .min(1, 'Please enter a make for this vehicle')
//       .max(50, 'Must not exceed 50 characters'),
//     model: z
//       .string()
//       .trim()
//       .min(1, 'Please enter a model for this vehicle')
//       .max(50, 'Must not exceed 50 characters'),
//     year: z
//       .string()
//       .trim()
//       .min(1, 'Please enter a valid year')
//       .max(10, 'Must not exceed 10 characters'),
//     mileage: z
//       .number()
//       .int()
//       .nonnegative('Mileage must be a non negative number')
//       .lte(1000000, 'Please enter a valid mileage'),
//     type: z.enum(bodyTypes),
//     extColor: z
//       .string()
//       .trim()
//       .min(1, 'Please enter an exterior color')
//       .max(50, 'Must not exceed 50 characters'),
//     intColor: z
//       .string()
//       .trim()
//       .min(1, 'Please enter an interior color')
//       .max(50, 'Must not exceed 50 characters'),
//     trans: z.enum(transmissions),
//     engine: z
//       .string()
//       .trim()
//       .min(1, 'Please enter what engine this vehicle has')
//       .max(50, 'Must not exceed 50 characters'),
//     fuel: z.enum(fuelTypes),
//     cleanTitle: z.boolean(),
//   }),
//   z.object({ 
//     category: z.literal('parts'),
//     name: z.string()
//   })
// ])