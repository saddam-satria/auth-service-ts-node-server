import React, { useContext, useState } from 'react';
import { BASE_URL } from '../config/constant';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { loginMutation } from '../graphql/mutations/login.mutation';
import { userContext } from '../context/user.context';

const Home: React.FC = (): JSX.Element => {
  const action = useContext(userContext);
  const [login, { data, error }] = useMutation(loginMutation);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  if (data) {
    const { accessToken, refreshToken } = data.login;
    action.login(accessToken, refreshToken);
  }

  return (
    <>
      <div className="min-h-screen bg-secondary">
        <div className="max-w-7xl py-12 mx-auto px-4">
          <div className="flex bg-red-500 shadow-lg shadow-black ">
            <div className="flex-auto w-28 bg-third px-12 py-6">
              <img className="object-cover hidden lg:inline-flex w-full" src={`${BASE_URL}/img/Memory storage-amico.svg`} alt="memory storage" />
            </div>
            <div className="flex-auto w-64 bg-primary py-24">
              <div className="flex flex-col space-y-5 px-4 md:px-12 lg:px-20">
                <h5 className="text-secondary text-xl">Login App</h5>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email">email</label>
                  <input
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    type="text"
                    name="email"
                    placeholder="enter email"
                    className="border-none focus:outline-none shadow-xl bg-primary py-2 px-4 rounded-xl"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="password">Password</label>

                  <input
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type="password"
                    name="password"
                    placeholder="enter password"
                    className="border-none focus:outline-none shadow-xl bg-primary py-2 px-4 rounded-xl"
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  {data && !error && <span className="text-green-600">Success Login</span>}
                  {error && <span className="text-red-500">{error.message}</span>}
                  <span>
                    Doesn't have an account ?{' '}
                    <Link to="/register" className="text-blue-500">
                      Register
                    </Link>
                  </span>
                  <button
                    className="py-2 rounded-xl capitalize bg-secondary text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      login({
                        variables: {
                          email: user.email,
                          password: user.password,
                        },
                      });
                    }}
                  >
                    Login
                  </button>
                  <button className="py-2 rounded-xl capitalize bg-red-500 text-white">Google</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;