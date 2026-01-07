import { Space, SpaceSchema } from '../model/Space';

export class JsonError extends Error {}

export const validateSpace = (space: Space) => {
  const result = SpaceSchema.safeParse(space);
  return result;
};

export const parseJSON = (body: string) => {
  try {
    return JSON.parse(body);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new JsonError(message);
  }
};
