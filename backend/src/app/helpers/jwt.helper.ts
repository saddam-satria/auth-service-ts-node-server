import { IPayload } from '../utils/interface/payload.interface';
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';

interface IJWTHelper {
  readonly secret_key: any;
  refreshToken(payload: IPayload): string;
  accessToken(payload: IPayload): string;
}

class JWTHelper implements IJWTHelper {
  readonly secret_key: any = process.env.SECRET_TOKEN || 'asdwadawwasdaswasccsadasksadmkl';
  constructor() {
    config();
  }
  public refreshToken(payload: IPayload): string {
    return sign(payload, this.secret_key);
  }
  public accessToken(payload: IPayload): string {
    return sign(payload, this.secret_key);
  }
}

export default new JWTHelper();
