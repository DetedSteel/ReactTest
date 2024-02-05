import axios from 'axios';
import { linkT } from '../components/LinksList/LinksList';

export async function getStats(limit: number, offset: number, order: string) {
  const res = await axios.get(
    `https://front-test.hex.team/api/statistics?order=${order}&offset=${offset}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  console.log(res);

  return { links: res.data as linkT[], count: res.headers['x-total-count'] };
}
