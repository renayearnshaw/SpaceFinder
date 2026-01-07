import { Space, SpaceSchema } from '../model/Space';

export const validateSpace = (space: Space) => {
  const result = SpaceSchema.safeParse(space);
  return result;
};
