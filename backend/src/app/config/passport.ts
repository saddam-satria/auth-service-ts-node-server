import passport from 'passport';
import GoogleStrategy, { VerifyCallback } from 'passport-google-oauth20';
import jwtHelper from '../helpers/jwt.helper';

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      callbackURL: '/google/redirect',
    },
    (_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) => {
      const accessToken = jwtHelper.accessToken({ name: profile._json.name, email: profile._json.email });
      const refreshToken = jwtHelper.refreshToken({ name: profile._json.name, email: profile._json.email });
      done(null, { accessToken, refreshToken });
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

export default passport;
