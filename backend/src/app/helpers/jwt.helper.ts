import { IPayload } from '../utils/interface/payload.interface';
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';

interface IJWTHelper {
  readonly secret_key: any;
  refreshToken(payload: IPayload): string;
  accessToken(payload: IPayload): string;
  verifyToken(token: string): JwtPayload | string;
}

class JWTHelper implements IJWTHelper {
  readonly secret_key: any = process.env.SECRET_TOKEN || 'asdwadawwasdaswasccsadasksadmkl';
  constructor() {
    config();
  }
  public refreshToken(payload: IPayload): string {
    return sign(payload, this.secret_key, {
      expiresIn: '14d',
    });
  }
  public accessToken(payload: IPayload | JwtPayload): string {
    return sign(payload, this.secret_key, {
      expiresIn: '1m',
    });
  }
  public verifyToken(token: string): JwtPayload | string {
    const response = verify(token, this.secret_key);
    return response;
  }
}

export default new JWTHelper();
