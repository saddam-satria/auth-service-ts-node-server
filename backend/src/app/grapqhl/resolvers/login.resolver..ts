import { Arg, Mutation, Resolver } from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../../repositories/users.repository';
import AuthQuery from '../queries/auth.query';

@Resolver()
class LoginResolver {
  @Mutation(() => AuthQuery, { description: 'Login Mutation' })
  async login(@Arg('email') email: string, @Arg('password') password: string): Promise<AuthQuery> {
    const usersRepo = getCustomRepository(UsersRepository);
    try {
      const currentUser = await usersRepo.findByEmail(email);
      if (!currentUser) throw new Error('email not found');
      const passwordMatch: Promise<boolean> | boolean = await usersRepo.comparePassword(password, currentUser.password);
      if (!passwordMatch) throw new Error('wrong password');
      const token: string = usersRepo.generateToken({ name: currentUser.name, email: currentUser.email, id: currentUser.id });

      return {
        status: 'success',
        message: 'login succesfully',
        token,
      };
    } catch (error) {
      return {
        status: 'error',
        message: error,
      };
    }
  }
}

export default LoginResolver;
