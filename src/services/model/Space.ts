import { z } from "zod";

export const SpaceSchema = z.object({
  id: z.string(),
  location: z.string(),
  name: z.string(),
  photoUrl: z.string().optional(),
});

// Infer the following TypeScript type from the schema:
// {
//   id: string;
//   location: string;
//   name: string;
//   photoUrl?: string;
// }
export type Space = z.infer<typeof SpaceSchema>;
