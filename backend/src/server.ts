import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './app/config/router';
import path from 'path';
import { config } from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import schema from './app/grapqhl/schema';
import { createConnection } from 'typeorm';

(async () => {
  const app = express();
  const PORT: number | string = process.env.PORT || 5000;
  config();

  app.use(cors());
  app.use('/static', express.static(path.join(__dirname, '../public')));
  app.use(express.json());
  app.use(routes);

  const apolloServer = new ApolloServer({
    schema: await schema(),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
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
