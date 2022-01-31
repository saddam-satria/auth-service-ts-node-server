import UsersEntity from '../../entities/Users';
import { EntityRepository, Repository } from 'typeorm';

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
}

export default UsersRepository;
