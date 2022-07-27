//import { injectable } from 'tsyringe';
import { User } from '@prisma/client';
import { prisma } from '~/infra/prisma';
import { IUserRepository, UserD } from '../IUser.Repository';

export interface IUser {
  id: string;
}
export class UserRepository implements IUserRepository {
  async UserCreate({ name, email, password }: User) {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }

  async findEmail(email: string): Promise<UserD> {
    const [user] = await prisma.user.findMany({ where: { email } });
    return user;
  }

  async activeUser({ id }: IUser): Promise<UserD> {
    const user = prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });
    return user;
  }

  async findId(id: string): Promise<UserD> {
    const [user] = await prisma.user.findMany({ where: { id } });
    return user;
  }

  async resetPassword(id: string, password: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  }
}
