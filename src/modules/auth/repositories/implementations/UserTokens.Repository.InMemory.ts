import { IUserTokensRepository, UserToken } from '../IUserTokens.Repository';

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userTokens: UserToken[] = [];
  async tokenCreate({ user_id, token }: UserToken): Promise<UserToken> {
    const create = {
      id: String(new Date().valueOf()),
      user_id,
      token,
    };
    await this.userTokens.push(create);
    return create;
  }
  async tokenExists(user_id: string): Promise<UserToken> {
    const find = await this.userTokens.find(
      (token) => token.user_id === user_id,
    );
    return find;
  }
  async removeToken(id: string): Promise<void> {
    await this.userTokens.filter((token) => token.id !== id);
  }
}
