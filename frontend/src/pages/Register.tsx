import React, { useContext, useState } from 'react';
import { BASE_URL } from '../config/constant';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { registerMutation } from '../graphql/mutations/register.mutation';
import { userContext } from '../context/user.context';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = (): JSX.Element => {
  const action = useContext(userContext);
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });
  const [register, { data, error }] = useMutation(registerMutation);

  if (data) {
    const { accessToken, refreshToken } = data.register;
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
                <h5 className="text-secondary text-xl">Register App</h5>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name">name</label>
                  <input onChange={(e) => setUser({ ...user, name: e.target.value })} type="text" name="name" placeholder="enter name" className="border-none focus:outline-none shadow-xl bg-primary py-2 px-4 rounded-xl" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email">email</label>
                  <input onChange={(e) => setUser({ ...user, email: e.target.value })} type="text" name="email" placeholder="enter email" className="border-none focus:outline-none shadow-xl bg-primary py-2 px-4 rounded-xl" />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="password">Password</label>
                  <input onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" name="password" placeholder="enter password" className="border-none focus:outline-none shadow-xl bg-primary py-2 px-4 rounded-xl" />
                </div>
                <div className="flex flex-col space-y-3">
                  {data && !error && <span className="text-green-600">Success Register</span>}
                  {error && <span className="text-red-500">{error.message}</span>}
                  <span>
                    have an account ?{' '}
                    <Link to="/login" className="text-blue-500">
                      Login
                    </Link>
                  </span>
                  <button
                    className="py-2 rounded-xl capitalize bg-secondary text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      register({
                        variables: {
                          name: user.name,
                          email: user.email,
                          password: user.password,
                        },
                      });
                    }}
                  >
                    Register
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

export default Register;
