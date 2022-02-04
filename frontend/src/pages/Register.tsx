import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { registerMutation } from '../graphql/mutations/register.mutation';
import { userContext } from '../context/user.context';
import axios from '../config/axios';
import { SERVER_URL } from '../config/constant';

interface IUser {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = (): JSX.Element => {
  const action = useContext(userContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    password: '',
  });
  const [register, { data, error }] = useMutation(registerMutation, {
    errorPolicy: 'all',
  });
  const [failedLogin, setFailedLogin] = useState(false);

  useEffect(() => {
    if (failedLogin) setTimeout(() => setFailedLogin(false), 1500);
  }, [failedLogin]);

  useEffect(() => {
    if (data) {
      const { accessToken, refreshToken } = data.register;
      action.login(accessToken, refreshToken);
      return navigate('/');
    }

    if (error) {
      return setFailedLogin(true);
    }
  }, [navigate, action, data, error]);

  const googleSignIn = (_e: any) => {
    const newWindow = window.open(`${SERVER_URL}/google`, '__blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    let timer = null;
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          axios
            .get('/google/data', { withCredentials: true })
            .then((res) => res.data)
            .then((data) => {
              if (!data) return navigate('/register');

              return action.login(data.accessToken, data.refreshToken);
            })
            .catch((err) => console.log(err));
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 500);
    }
  };

  return (
    <>
      <div className="max-w-7xl py-12 mx-auto px-4">
        <div className="flex bg-red-500 shadow-lg shadow-black ">
          <div className="flex-auto w-28 bg-third px-12 py-6">
            <img className="object-cover hidden lg:inline-flex w-full" src={`${process.env.PUBLIC_URL as string}/img/Memory storage-amico.svg`} alt="memory storage" />
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
                {failedLogin && <span className="text-red-500">{error.message}</span>}
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
                <button onClick={googleSignIn} className="py-2 rounded-xl capitalize bg-red-500 text-white">
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
