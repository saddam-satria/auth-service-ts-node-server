import { buildSchema } from 'type-graphql';
import LoginResolver from './resolvers/login.resolver.';
import RefreshTokenResolver from './resolvers/refreshToken.resolver';
import RegisterResolver from './resolvers/register.resolver';
import UsersResolver from './resolvers/users.resolver';

export default async () => {
  return await buildSchema({
    resolvers: [LoginResolver, RegisterResolver, UsersResolver, RefreshTokenResolver],
  });
};
