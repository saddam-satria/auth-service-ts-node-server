import 'reflect-metadata';
import express, { Response, Request } from 'express';
import cors from 'cors';
import routes from './app/config/router';
import path from 'path';
import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './app/grapqhl/schema';
import { createConnection } from 'typeorm';

import passport from './app/config/passport';

(async () => {
  const app = express();
  const PORT: number | string = process.env.PORT || 5000;
  config();

  app.use(cors());
  app.use('/static', express.static(path.join(__dirname, '../public')));
  app.use(express.json());
  app.use(routes);

  app.use(passport.initialize());
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
    }),
    (req: Request, res: Response) => {
      const user: any = req.user;

      res.json({ user }).status(200);
    }
  );

  const apolloServer = new ApolloServer({
    schema: await schema(),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    introspection: true,
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
