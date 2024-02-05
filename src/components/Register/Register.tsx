import axios from 'axios';
import { FC } from 'react';
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
    // watch,
    formState: { errors },
  } = useForm<userT>();

  // console.log(watch());

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
            console.log('login', login)
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', login.data.access_token);
          })();
        }
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
        <input className='button' value='Create account' type="submit" />
      </form>
      <Link className='button' to={'/login'}>Login</Link>
    </div>
  );
};
