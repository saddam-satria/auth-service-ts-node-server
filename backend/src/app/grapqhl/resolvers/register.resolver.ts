import { Resolver, Mutation, Arg } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import AuthMutation from '../mutations/auth.mutation';
import UsersRepository from '../../repositories/users.repository';
import UsersEntity from '../../../entities/Users';
import AuthQuery from '../queries/auth.query';
import hashModule from '../../modules/hash.module';
import jwtHelper from '../../helpers/jwt.helper';

@Resolver()
class RegisterResolver {
  @Mutation(() => AuthQuery, { description: 'Register Mutation' })
  async register(@Arg('user') user: AuthMutation): Promise<AuthQuery> {
    const usersRepo: UsersRepository = getCustomRepository(UsersRepository);
    const newUser = usersRepo.create();
    try {
      newUser.email = user.email;
      newUser.name = user.name;
      newUser.password = await hashModule.hashPassword(user.password);
      const currentUser: Promise<UsersEntity> = usersRepo.save(newUser);
      const accessToken: string = jwtHelper.accessToken({ email: (await currentUser).email, name: (await currentUser).name, id: (await currentUser).id });
      const refreshToken: string = jwtHelper.refreshToken({ email: (await currentUser).email, name: (await currentUser).name, id: (await currentUser).id });

      return {
        status: 'success',
        message: 'register successfully',
        accessToken,
        refreshToken,
      };
    } catch (error) {
      return {
        status: 'success',
        message: 'register successfully',
      };
    }
  }
}

export default RegisterResolver;
