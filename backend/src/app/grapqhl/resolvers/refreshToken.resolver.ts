import { Arg, Query, Resolver } from 'type-graphql';
import JWTHelper from '../../helpers/jwt.helper';
import jwtHelper from '../../helpers/jwt.helper';
import NewTokenPayload from '../queries/newToken.query';

@Resolver()
class RefreshTokenResolver {
  @Query(() => NewTokenPayload, { description: 'Refresh Token Handler' })
  refreshToken(@Arg('refreshToken') token: string): NewTokenPayload | void {
    try {
      const activeUser = JWTHelper.verifyToken(token);
      return {
        accessToken: jwtHelper.accessToken({ activeUser }),
      };
    } catch (error) {
      if (error.message.includes('invalid token')) throw new Error('invalid token');
      if (error.message.includes('jwt expired')) throw new Error('token expired');
    }
  }
}

export default RefreshTokenResolver;
