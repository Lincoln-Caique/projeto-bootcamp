import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserTokensRepository from '@modules/users/repositories/ IUsersRepository';
import { uuid } from 'uuidv4';
import UserToken from '../../infra/typeorm/entities/UserToken'

class FakeUserTokensRepository implements IUserTokensRepository{
  findById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  create(date: ICreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
  save(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(findToken => findToken.token === token);

    return userToken;
  }

}


export default FakeUserTokensRepository;

