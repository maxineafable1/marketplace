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
  'Manual Transmission',
  'Automatic Transmission',
  'CVT',
] as const

export const fuelTypes = [
  'Gasoline',
  'Diesel',
  'Electric',
  'Hybrid',
] as const

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
    .number()
    .int()
    .finite()
    .nonnegative('Price must be a non negative number')
    .lte(1_000_000_000, 'Please enter a valid price'),
  images: z
    .string()
    .array()
    .min(1, 'Images can\'t be empty')
    .max(10, 'Can only have 10 images'),
  category: z.enum(category),
})

const vehicleSchema = z.object({
  make: z
    .string()
    .trim()
    .min(1, 'Please enter a make for this vehicle')
    .max(50, 'Must not exceed 50 characters'),
  model: z
    .string()
    .trim()
    .min(1, 'Please enter a model for this vehicle')
    .max(50, 'Must not exceed 50 characters'),
  year: z
    .string()
    .trim()
    .min(1, 'Please enter a valid year')
    .max(10, 'Must not exceed 10 characters'),
  mileage: z
    .number()
    .int()
    .nonnegative('Mileage must be a non negative number')
    .lte(1000000, 'Please enter a valid mileage'),
  type: z.enum(bodyTypes),
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
  trans: z.enum(transmissions),
  engine: z
    .string()
    .trim()
    .min(1, 'Please enter what engine this vehicle has')
    .max(50, 'Must not exceed 50 characters'),
  fuel: z.enum(fuelTypes),
  cleanTitle: z.boolean(),
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