import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './app/config/router';
import path from 'path';
import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './app/grapqhl/schema';
import { createConnection } from 'typeorm';
import cookieSession from 'cookie-session';

import passport from './app/config/passport';

(async () => {
  const app = express();
  const PORT: number | string = process.env.PORT || 5000;
  config();

  app.use(
    cors({
      origin: process.env.CLIENT_URL as string,
      credentials: true,
    })
  );
  app.use('/static', express.static(path.join(__dirname, '../public')));
  app.use(express.json());
  app.use(routes);

  app.use(
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      keys: [process.env.SECRET_TOKEN as string],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.get(
    '/google',
    passport.authenticate('google', {
      scope: ['email', 'profile'],
    })
  );
  app.get(
    '/google/redirect',
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      successRedirect: `${process.env.CLIENT_URL as string}/auth/google/redirect`,
    })
  );

  app.get('/google/data', (req: Request, res: Response) => {
    res.send(req.user);
  });

  const apolloServer = new ApolloServer({
    schema: await schema(),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    introspection: true,
    context: ({ req }) => req.headers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  try {
    await createConnection();
    app.listen(PORT, () => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`server running on http://localhost:${PORT}`);
      } else {
        console.log(`server running on port ${PORT}`);
      }
    });
    console.log('database connected');
  } catch (error) {
    console.error(error);
  }
})();
