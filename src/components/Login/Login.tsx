import axios from 'axios';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userT } from '../Register/Register';
import { Link, useNavigate } from 'react-router-dom';
import { Redirect } from '../Redirect/Redirect';

export const Login: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userT>();

  const navigate = useNavigate();

  const [loginError, setLoginError] = useState(false);

  const onSubmit: SubmitHandler<userT> = (data) => {
    console.log(data);
    axios
      .post('https://front-test.hex.team/api/login', data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', response.data.access_token);
          navigate('/mylinks');
        }
        console.log(response);
      })
      .catch((errors) => {
        setLoginError(true);
        console.log(errors);
      });
  };

  if (localStorage.getItem('username')) {
    return <Redirect url="/mylinks" />;
  }

  return (
    <div className="login_container">
      {loginError && (
        <div className="error_popup">
          <p>Wrong password</p>
          <button onClick={() => setLoginError(false)} className="button">
            Back
          </button>
        </div>
      )}
      <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input_container">
          <input
            className="input"
            placeholder="login"
            type="text"
            {...register('username', { required: true })}
          />
          {errors.username && <span className="error_text">Login is required</span>}
        </div>
        <div className="input_container">
          <input
            className="input"
            type="password"
            placeholder="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="error_text">Password is required</span>}
        </div>
        <input className="button" value="Login" type="submit" />
      </form>
      <Link className="button" to={'/register'}>
        Register
      </Link>
    </div>
  );
};
