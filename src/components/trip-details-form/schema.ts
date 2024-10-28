import { z } from "zod";

export const tripDetailsFormSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  evType: z.string(),
  drivingStyle: z.string(),
});

export type TripDetailsFormSchema = z.infer<typeof tripDetailsFormSchema>;
