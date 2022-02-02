import { UsersQuery } from '../graphql/queries/users.query';
import GetDataHook from '../hooks/getData.hook';

const Home: React.FC = (): JSX.Element => {
  const response = GetDataHook(UsersQuery);

  return (
    <h1>
      {response &&
        response.users.map((user) => {
          return user.name;
        })}
    </h1>
  );
};

export default Home;
