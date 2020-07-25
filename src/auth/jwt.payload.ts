import { User } from '../api/user/user.entity';
export interface JwtPayload {
  user: User;
}
