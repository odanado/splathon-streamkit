import { z } from "zod";

export const ladderMatchSchema = z.object({
  id: z.string(),
  alpha: z.string(),
  bravo: z.string(),
});

export type LadderMatch = z.infer<typeof ladderMatchSchema>;
