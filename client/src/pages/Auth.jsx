import { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import store from 'store';

// Queries
import { SIGN_IN_MUTATION, SIGN_UP_MUTATION } from '../apollo/queries/auth';

import { PREFIX } from '../config';

const Auth = () => {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [authData, setAuthData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signIn] = useMutation(SIGN_IN_MUTATION);
  const [signUp] = useMutation(SIGN_UP_MUTATION);

  const toggleIsSignUp = () => {
    setIsSignUp(prevState => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      const {data: {signUp: signUpAcessToken}} = await signUp({
        variables: {
          ...authData,
        },
      });

      store.set(`${PREFIX}access_token`, signUpAcessToken);
      navigate('/');
      console.log(signUpAcessToken);
    } else {
      const { data: {signIn: signInAcessToken} } = await signIn({
        variables: {
          email: authData.email,
          password: authData.password
        },
      });
      store.set(`${PREFIX}access_token`, signInAcessToken);
      navigate('/');
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setAuthData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <Container fluid>
      <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-primary">Sign {isSignUp ? 'Up' : 'In'}</h2>
        <Form onSubmit={handleSubmit} className="border border-primary rounded p-4">
          {isSignUp && <Form.Group className="mb-3" controlId="username">
            <Form.Label className="text-primary">Username</Form.Label>
            <Form.Control onChange={handleChange} name="username" type="text" required />
          </Form.Group>}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="text-primary">E-mail</Form.Label>
            <Form.Control onChange={handleChange} name="email" type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="text-primary">Password</Form.Label>
            <Form.Control onChange={handleChange} name="password" type="password" required />
          </Form.Group>
          <Button type="submit" variant="primary">Sign {isSignUp ? 'Up' : 'In'}</Button>
        </Form>
        <p className="mt-2">
          {isSignUp ? 'Already have an' : 'Don\'t have an'} account? {' '}
          <Button
            onClick={toggleIsSignUp}
            variant="link"
            className="p-0"
          >
            Sign {isSignUp ? 'In' : 'Up'}
          </Button>
        </p>
      </div>
    </Container>
  );
};

export default Auth;