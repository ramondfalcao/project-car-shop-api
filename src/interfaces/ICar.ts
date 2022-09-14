import { z } from 'zod';
import { VehicleZod } from './IVehicle';

export const CarZod = VehicleZod.extend({
  doorsQty: z.number().int().positive()
    .min(2)
    .max(4),
  seatsQty: z.number().min(2).max(7),
});

type ICar = z.infer<typeof CarZod>;

export { ICar };