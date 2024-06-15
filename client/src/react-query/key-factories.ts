import { queryKeys } from "./constants";

export const generateUserKey = (userId: string, userToken: string) => [
  queryKeys.user,
  userId,
  userToken,
];
