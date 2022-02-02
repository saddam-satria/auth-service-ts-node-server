import { Resolver, Mutation, Arg } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import AuthMutation from '../mutations/auth.mutation';
import UsersRepository from '../../repositories/users.repository';
import UsersEntity from '../../../entities/Users';
import jwtHelper from '../../helpers/jwt.helper';
import AuthQuery from '../queries/auth.query';
import { validate } from 'class-validator';

@Resolver()
class RegisterResolver {
  @Mutation(() => AuthQuery, { description: 'Register Mutation' })
  async register(@Arg('user') user: AuthMutation): Promise<AuthQuery> {
    const usersRepo: UsersRepository = getCustomRepository(UsersRepository);
    const newUser = usersRepo.create();
    try {
      newUser.email = user.email;
      newUser.name = user.name;
      newUser.password = user.password;

      const errors = (await validate(newUser)) as any;

      if (errors.length > 0) {
        errors.map((error: any) => {
          if (error.property.includes('email')) throw 'email must valid';
          if (error.property.includes('password')) throw 'password must have between 8-16 characters';
        });
      }
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
      if (error.message || error.code === '23505') {
        if (error.message.includes('duplicate key value violates unique constraint')) throw new Error('Email has been register');
      }

      throw new Error(error);
    }
  }
}

export default RegisterResolver;
