import { z } from "zod";
interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  amount: number;
}
const UserSchema = z.object({
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
  amount: z.number().default(0),
});
export { User, UserSchema };
