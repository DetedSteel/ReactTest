import axios from 'axios';
import { FC } from 'react';
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
      .catch((errors) => console.log(errors));
  };

  if (localStorage.getItem('username')) {
    return <Redirect url="/mylinks" />;
  }

  return (
    <div className='login_container'>
      <form className='login_form' action="" onSubmit={handleSubmit(onSubmit)}>
        <input className='input' placeholder="login" type="text" {...register('username', { required: true })} />
        {errors.username && <span>Login is required</span>}
        <input className='input' type="text" placeholder="password" {...register('password', { required: true })} />
        {errors.password && <span>Password is required</span>}
        <input className='button' value='Login' type="submit" />
      </form>
      <Link className='button' to={'/register'}>Register</Link>
    </div>
  );
};
