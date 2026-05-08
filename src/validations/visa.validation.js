import { z } from 'zod';

export const visaApplicationSchema = z.object({
  body: z.object({
    fullName: z.string().min(3, 'Full name is required'),
    passportNumber: z.string().min(5, 'Passport number is required'),
    nationality: z.string().min(2, 'Nationality is required'),
    phone: z.string().min(8, 'Phone number is required'),
    visaType: z.string().min(2, 'Visa type is required'),
    documents: z.array(z.string().url()).optional(),
  }),
});
