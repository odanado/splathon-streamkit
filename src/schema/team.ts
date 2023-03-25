import { z } from "zod";

export const teamSchema = z.object({
  name: z.string(),
  score: z.coerce.number(),
});

export type Team = z.infer<typeof teamSchema>;
