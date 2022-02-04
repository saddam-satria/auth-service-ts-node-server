import React, { useEffect } from 'react';

const RedirectGoogleAuth: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 1500);
  }, []);

  return <>Redirect...</>;
};

export default RedirectGoogleAuth;
