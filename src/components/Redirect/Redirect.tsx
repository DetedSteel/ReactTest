import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Redirect: FC<{ url: string }> = ({ url }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(url);
  }, [navigate, url]);

  return <div></div>;
};
