import React from 'react';
import { Link } from 'react-router-dom';
import { StandaloneFormPage } from 'tabler-react';

import AuthForm from '../../components/AuthForm';
import ROUTES from '../../utils/routes';

import logo from '../../logo.svg';

const INPUTS = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'email',
    validation: {
      required: 'Please enter an email',
    },
  },
  {
    label: 'Username',
    name: 'username',
    placeholder: 'username',
    type: 'text',
    validation: {
      pattern: {
        value: /^[a-zA-Z._0-9]+$/,
        message:
          'Please use only english letters, numbers, dots and underscores',
        minLength: {
          value: 3,
          message: 'Username should have at least 3 characters',
        },
      },
    },
  },
  {
    password: true,
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'password',
    validation: {
      required: 'Please enter a password',
      minLength: {
        value: 6,
        message: 'Password should have at least 6 characters',
      },
    },
  },
];

const RegisterPage = () => {
  // const [register, registerQuery] = useApiRegister();

  // const onSubmit = (form) => register(form);

  return (
    <StandaloneFormPage imageURL={logo}>
      <AuthForm
        inputs={INPUTS}
        title="Create New Account"
        buttonText="Create Account"
        onSubmit={console.log}
        // buttonLoading={registerQuery.isLoading}
        formAfter={
          <div className="mt-2">
            Already have an account? <Link to={ROUTES.LOGIN}>Login</Link>
          </div>
        }
      />
    </StandaloneFormPage>
  );
};

export default RegisterPage;