import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getStats } from '../../utils/getStats';
import { squeeze } from '../../utils/squeeze';
import styles from './links_list.module.css';
import { useNavigate } from 'react-router-dom';

type squeezeT = { link: string };
export type linkT = { id: number; short: string; target: string; counter: number };

export const LinksList: FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<squeezeT>();

  const [links, setLinks] = useState<linkT[]>();
  const [page, setPage] = useState<number>(0);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [sort, setSort] = useState<string>('desc_counter');
  const [paginatinNums, setPaginatinNums] = useState([2, 3, 4]);

  useEffect(() => {
    (async () => {
      const links = await getStats(10, page * 10, sort);
      console.log(links.count / 10);
      setPagesCount(Math.ceil(links.count / 10));
      setLinks(links.links);
    })();
  }, [page, sort]);

  useEffect(() => {
    if (page === 0 || page === 1 || page === 2) {
      setPaginatinNums([2, 3, 4]);
    } else if (page === pagesCount - 1 || page === pagesCount - 2 || page === pagesCount - 3) {
      setPaginatinNums([pagesCount - 4, pagesCount - 3, pagesCount - 2]);
    } else {
      setPaginatinNums([page, page + 1, page + 2]);
    }
  }, [page, pagesCount]);

  const onSubmit: SubmitHandler<squeezeT> = (data) => {
    squeeze(data.link);
    (async () => {
      const links = await getStats(10, page * 10, sort);
      console.log(links.count / 10);
      setPagesCount(Math.ceil(links.count / 10));
      setLinks(links.links);
    })();
  };

  return (
    <div className={styles.container}>
      <h1>You are logged in as {localStorage.getItem('username')}</h1>
      <button
        className={`button ${styles.logout}`}
        onClick={() => {
          localStorage.removeItem('username');
          navigate('/login');
        }}
      >
        Logout
      </button>
      <form className={styles.create_link} onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...(register('link'), { required: true })} className="input" />
        {errors.link && <span className='error_text'>Link is required</span>}
        <input type="submit" value="Create new link" className="button" />
      </form>
      <select
        className="button"
        onChange={(e) => {
          setSort(e.target.value);
        }}
      >
        <option value="desc_counter">desc counter</option>
        <option value="asc_short">asc short</option>
        <option value="asc_target">asc target</option>
        <option value="asc_counter">asc counter</option>
        <option value="desc_short">desc short</option>
        <option value="desc_target">desc target</option>
      </select>
      <div className={styles.links_container}>
        {links?.map((link) => (
          <div key={link.id} className={styles.link_info}>
            <p>Long: {link.target}</p>
            <p>Short: https://front-test.hex.team/s/{link.short}</p>
            <p>Redirects: {link.counter}</p>
          </div>
        ))}
      </div>
      {pagesCount >= 6 ? (
        <div className={styles.pagination}>
          <button
            className={`${styles.btn} ${page === 0 ? styles.active : ''}`}
            onClick={() => setPage(0)}
          >
            1
          </button>
          {paginatinNums.map((n) => (
            <button
              className={`${styles.btn} ${page === n - 1 ? styles.active : ''}`}
              onClick={() => setPage(n - 1)}
              key={n}
            >
              {n}
            </button>
          ))}
          <p>...</p>
          <button
            className={`${styles.btn} ${page === pagesCount - 1 ? styles.active : ''}`}
            onClick={() => setPage(pagesCount - 1)}
          >
            {pagesCount - 1}
          </button>
        </div>
      ) : (
        <div className={styles.pagination}>
          {Array.from({ length: Math.ceil(pagesCount) })
            .map((_, i) => i)
            .map((e) => {
              return (
                <button
                  className={`${styles.btn} ${page === e ? styles.active : ''}`}
                  onClick={() => setPage(e)}
                  key={e}
                >
                  {e + 1}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};
