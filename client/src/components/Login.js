import React from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { useForm } from '../utils/useForm';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  const formSubmitCallback = () => {
    axiosWithAuth()
      .post('/login', values)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        history.push('/bubblepage');
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log('Invalid login: ', err);
      })
  };

  const [values, handleChanges, handleSubmit] = useForm({
    username: '',
    password: ''
  },
    formSubmitCallback
  );

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form onSubmit={handleSubmit}>
        <input type='text' name='username' value={values.username} onChange={handleChanges} />
        <input type='password' name='password' value={values.password} onChange={handleChanges} />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default Login;
