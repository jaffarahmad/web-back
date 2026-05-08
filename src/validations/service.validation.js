import { z } from 'zod';

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is too short'),
    description: z.string().min(10, 'Description is too short'),
    image: z.string().url('Invalid image URL'),
    price: z.number().positive('Price must be positive'),
    category: z.string().min(2, 'Category is required'),
  }),
});

export const updateServiceSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    image: z.string().url().optional(),
    price: z.number().positive().optional(),
    category: z.string().min(2).optional(),
  }),
});
