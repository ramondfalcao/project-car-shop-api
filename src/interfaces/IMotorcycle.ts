import { z } from 'zod';
import { VehicleZod } from './IVehicle';

export const MotorcycleZod = VehicleZod.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().max(2500),
});

type IMotorcycle = z.infer<typeof MotorcycleZod>;

export { IMotorcycle };