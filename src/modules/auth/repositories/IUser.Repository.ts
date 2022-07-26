import { User } from '@prisma/client';
import { IUser } from './implementations/User.Repository';

type UserData = Pick<User, 'name' | 'email' | 'password'>;

export interface IUserRepository {
  UserCreate({ name, email, password }: UserData): Promise<UserD>;

  findEmail(email: string): Promise<UserD>;
  activeUser({ id }: IUser): Promise<UserD>;

  findId(id: string): Promise<UserD>;

  resetPassword(id: string, password: string): Promise<void>;
}
export interface UserD {
  id?: string;
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
}
