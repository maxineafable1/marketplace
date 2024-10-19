import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Please enter your password')
})

export const signupSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Please enter at least 2 characters')
    .max(50, 'Must not exceed 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Please enter at least 2 characters')
    .max(50, 'Must not exceed 50 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email'),
  password: z
    .string()
    .trim()
    .min(8, 'Please enter at least 8 characters')
    .max(100, 'Must not exceed 100 characters')
})