import jwtHelper from '../../helpers/jwt.helper';
import { MiddlewareFn, NextFn } from 'type-graphql';

const authMiddleware: MiddlewareFn = async ({ context }, next: NextFn): Promise<any> => {
  const ctx = JSON.parse(JSON.stringify(context));
  if (!ctx.authorization) throw new Error('authorizaton failed, need token');
  const token: string = ctx.authorization.split(' ')[1];
  if (!token) throw new Error('authorizaton failed, need token');

  try {
    jwtHelper.verifyToken(token);

    return await next();
  } catch (error) {
    if (error.message.includes('jwt expired')) throw new Error('token expired');
    if (error.message.includes('invalid token')) throw new Error('invalid token');
  }
};

export default authMiddleware;
