import { FC } from 'react';
import { Redirect } from '../Redirect/Redirect';
import { LinksList } from '../LinksList/LinksList';

export const LinksPage: FC = () => {
  if (!localStorage.getItem('username')) {
    return <Redirect url="/login" />;
  }

  return <LinksList />;
};
