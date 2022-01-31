module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production' ? true : false,
  entities: [`${process.env.NODE_ENV !== 'production' ? 'src' : 'build'}/entities/**/*.{ts,js}`],
  migrations: [`${process.env.NODE_ENV !== 'production' ? 'src' : 'build'}/migrations/**/*.{ts,js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
