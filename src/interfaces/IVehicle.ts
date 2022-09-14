import { z } from 'zod';

export const VehicleZod = z.object({
  model: z.string().min(3),
  year: z.number().int().positive()
    .min(1900)
    .max(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int().positive(),
});

type IVehicle = z.infer<typeof VehicleZod>;

export { IVehicle };
