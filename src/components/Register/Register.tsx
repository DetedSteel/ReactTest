import axios from 'axios';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Redirect } from '../Redirect/Redirect';
import { Link } from 'react-router-dom';

export type userT = {
  username: string;
  password: string;
};

export const Register: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userT>();

  const [registerError, setRegisterError] = useState(false);

  const onSubmit: SubmitHandler<userT> = (data) => {
    console.log(data);
    axios
      .post(
        `https://front-test.hex.team/api/register?username=${data.username}&password=${data.password}`
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          (async () => {
            const login = await axios.post('https://front-test.hex.team/api/login', {
              username: data.username,
              password: data.password,
            });
            console.log('login', login);
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', login.data.access_token);
          })();
        }
      })
      .catch((errors) => {
        setRegisterError(true);
        console.log(errors);
      });
  };

  if (localStorage.getItem('username')) {
    return <Redirect url="/mylinks" />;
  }

  return (
    <div className="login_container">
      {registerError && (
        <div className="error_popup">
          <p>User with this login already exists</p>
          <button onClick={() => setRegisterError(false)} className="button">
            Back
          </button>
        </div>
      )}
      <form className="login_form" action="" onSubmit={handleSubmit(onSubmit)}>
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
        <input className="button" value="Create account" type="submit" />
      </form>
      <Link className="button" to={'/login'}>
        Login
      </Link>
    </div>
  );
};
