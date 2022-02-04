import UsersRepository from '../../repositories/users.repository';
import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import UsersEntity from '../../../entities/Users';
import authMiddleware from '../middlewares/auth.middleware';

@Resolver()
class UsersResolver {
  private usersRepo = getCustomRepository(UsersRepository);
  @Query(() => [UsersEntity], { description: 'get all users', name: 'users' })
  @UseMiddleware(authMiddleware)
  async getAllUser(): Promise<UsersEntity[] | void> {
    return await this.usersRepo.find();
  }
  // auth service container doesn't have to query users

  // @Query(() => UsersEntity, { description: 'user by email', name: 'userByEmail' })
  // async getUserByEmail(@Arg('email') email: string) {
  //   try {
  //     const user = await this.usersRepo.findByEmail(email);
  //     if (!user) throw new Error('user not found');

  //     return user;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }
  // @Query(() => UsersEntity, { description: 'user by name', name: 'userByName' })
  // async getUsersByName(@Arg('name') name: string) {
  //   try {
  //     const user = await this.usersRepo.findByName(name);
  //     if (!user) throw new Error('user not found');
  //     return user;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }

  // @Query(() => UsersEntity, { description: 'user by id', name: 'userByID' })
  // async getUsersByID(@Arg('id') id: string) {
  //   try {
  //     const user = await this.usersRepo.findById(id);
  //     if (!user) throw new Error('user not found');
  //     return user;
  //   } catch (error) {
  //     return error.message;
  //   }
  // }
}

export default UsersResolver;
