import React, { useContext } from 'react';
import axios from '../config/axios';
import { SERVER_URL } from '../config/constant';
import { userContext } from '../context/user.context';

const GoogleSignIn: React.FC = () => {
  const action = useContext(userContext);
  const googleSignIn = () => {
    const newWindow = window.open(`${SERVER_URL}/google`, '__blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    let timer = null;
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          axios
            .get('/google/data', { withCredentials: true })
            .then((res) => res.data)
            .then((data) => {
              if (!data) return navigate('/login');

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
    <button onClick={googleSignIn} className="py-2 rounded-xl capitalize bg-red-500 text-white">
      Google
    </button>
  );
};

export default GoogleSignIn;
