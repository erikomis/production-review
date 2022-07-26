export interface IUserTokensRepository {
  tokenCreate({ user_id, token }: UserToken): Promise<UserToken>;
  tokenExists(user_id: string): Promise<UserToken>;
  removeToken(id: string): Promise<void>;
}

export interface UserToken {
  id?: string;
  user_id: string;
  token: string;
}
