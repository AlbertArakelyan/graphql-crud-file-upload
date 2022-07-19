import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from 'store';

import { PREFIX } from '../config';


const withAuth = (Wrap) => {
  const user = store.get(`${PREFIX}access_token`);

  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!user) {
        navigate('/auth');
      }
      // eslint-disable-next-line
    }, [user]);

    return (
      user ? <Wrap {...props} /> : null
    );
  };
};

export default withAuth;