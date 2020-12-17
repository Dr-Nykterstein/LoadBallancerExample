import React from "react";
import { StandaloneFormPage } from 'tabler-react';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../logo.svg';

import AuthForm from '../../components/AuthForm';
import ROUTES from '../../utils/routes';

const INPUTS = [
  {
    label: 'Login',
    name: 'login',
    placeholder: 'login',
    type: 'text',
    validation: {
      required: 'Please enter a login',
    },
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'password',
    validation: {
      required: 'Please enter a password',
    },
  },
];

function LoginPage(props) {
  const history = useHistory();
  const onSubmit = async (form) => {
    try {
      console.log(form);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <StandaloneFormPage imageURL={logo}>
      <AuthForm
        inputs={INPUTS}
        title="Login to your Account"
        buttonText="Login"
        onSubmit={onSubmit}
        formAfter={
          <>
            <div className="mt-2">
              <br />
              Don&apos;t have an account?{' '}
              <Link to={ROUTES.REGISTER}>Sign up</Link>
            </div>
          </>
        }
      />
    </StandaloneFormPage>
  );
}

export default LoginPage;