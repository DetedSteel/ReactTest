import axios from 'axios';

export function squeeze(link: string) {
  axios
    .post(
      `https://front-test.hex.team/api/squeeze?link=${link}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .then((response) => {
      console.log(response);

      const links = localStorage.getItem('myLinks');
      if (links) {
        localStorage.setItem('myLinks', JSON.stringify([...JSON.parse(links), response.data.id]));
      } else {
        localStorage.setItem('myLinks', JSON.stringify([response.data.id]));
      }
    })
    .catch((err) => console.log(err));
}
