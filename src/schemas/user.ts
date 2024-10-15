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
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be not exceed 100 characters')
})