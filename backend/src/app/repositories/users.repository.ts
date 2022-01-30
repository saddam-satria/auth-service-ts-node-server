import UsersEntity from '../../entities/Users';
import { EntityRepository, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { hash, genSalt, compare } from 'bcrypt';
import { IPayload } from '../utils/interface/payload.interface';

@EntityRepository(UsersEntity)
class UsersRepository extends Repository<UsersEntity> {
  public findByEmail(email: string): Promise<UsersEntity | undefined> {
    return this.findOne({ email });
  }
  public findByName(name: string): Promise<UsersEntity | undefined> {
    return this.findOne({ name });
  }
  public findById(id: string): Promise<UsersEntity | undefined> {
    return this.findOne({ id });
  }
  public generateToken({ email, name, id }: IPayload): string {
    const secret_token: any = process.env.SECRET_TOKEN;
    return sign(
      {
        id,
        name,
        email,
      },
      secret_token
    );
  }
  public async hashPassword(plain: string): Promise<string> {
    const salt: Promise<string> | string = await genSalt(10);
    const hashPassword: Promise<string> | string = await hash(plain, salt);

    return hashPassword;
  }
  public async comparePassword(plain: string, hash: string): Promise<boolean> {
    return await compare(plain, hash);
  }
}

export default UsersRepository;
