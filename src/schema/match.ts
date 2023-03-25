import { z } from "zod";
import { teamSchema } from "./team";

export const matchSchema = z.object({
  id: z.string(),
  alpha: teamSchema,
  bravo: teamSchema,
});

export type Match = z.infer<typeof matchSchema>;
