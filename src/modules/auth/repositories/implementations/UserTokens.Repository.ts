import { prisma } from '~/infra/prisma';
import { UserToken } from '../IUserTokens.Repository';

export class UserTokensRepository {
  async tokenCreate({ user_id, token }: UserToken) {
    const tokenUser = prisma.user_tokens.create({
      data: {
        user_id,
        token,
      },
    });
    return tokenUser;
  }
  async tokenExists(user_id: string) {
    const tokenExists = await prisma.user_tokens.findFirst({
      where: {
        user_id,
      },
    });
    return tokenExists;
  }
  async removeToken(id: string) {
    console.log(id);
    await prisma.user_tokens.delete({
      where: {
        id,
      },
    });
  }
}
