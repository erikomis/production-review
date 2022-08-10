import { User } from '@prisma/client';
import { IUserRepository, UserD } from '../IUser.Repository';
import { IUser } from './User.Repository';

export class UserRepositoryInMemory implements IUserRepository {
  data: UserD[] = [];
  async UserCreate({
    name,
    email,
    password,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    const newUser = {
      id: String(new Date().valueOf()),
      name,
      email,
      password,
      isActive: false,
    };
    this.data.push(newUser);
    return newUser;
  }
  async activeUser({ id }: IUser): Promise<UserD> {
    const find = await this.findId(id);
    find.isActive = true;
    this.data.push(find);
    return find;
  }
  async findId(id: string): Promise<UserD> {
    const find = this.data.find((user) => user.id == id);
    return find;
  }
  async resetPassword(id: string, password: string): Promise<void> {
    const find = await this.findId(id);
    find.password = password;
    this.data.push(find);
  }

  public async findEmail(email: string) {
    const find = this.data.find((user) => user.email == email);
    return find;
  }
}
