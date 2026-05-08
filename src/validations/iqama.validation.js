import { z } from 'zod';

export const iqamaApplicationSchema = z.object({
  body: z.object({
    employeeName: z.string().min(3, 'Employee name is required'),
    iqamaNumber: z.string().min(5, 'Iqama number is required'),
    companyName: z.string().min(2, 'Company name is required'),
    expiryDate: z.string().min(5, 'Expiry date is required'),
  }),
});
