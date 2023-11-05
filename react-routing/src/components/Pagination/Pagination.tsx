import { FC, MouseEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

interface PaginationProps {
  totalItems: number;
  cardsPerPage: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

const LEFT_ARROW = 'LEFT';
const RIGHT_ARROW = 'RIGHT';

const range = (from: number, to: number, step: number = 1): string[] => {
  const result = [];

  for (let i = from; i <= to; i += step) {
    result.push(i.toString());
  }

  return result;
};

const Pagination: FC<PaginationProps> = ({ totalItems, cardsPerPage, pageNumber, setPageNumber }): ReactElement => {
  const getPageNumbers = (totalPages: number, currentPage: number, pageNeighbours: number) => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalButtons = totalNumbers + 2;

    if (totalPages > totalButtons) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);

      const hasLeftHidden = startPage > 2;
      const hasRightHidden = totalPages - endPage > 1;
      const hiddenTotal = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftHidden && !hasRightHidden: {
          const extraPages = range(startPage - hiddenTotal, startPage - 1);
          pages = [LEFT_ARROW, ...extraPages, ...pages];
          break;
        }

        case !hasLeftHidden && hasRightHidden: {
          const extraPages = range(endPage + 1, endPage + hiddenTotal);
          pages = [...pages, ...extraPages, RIGHT_ARROW];
          break;
        }

        case hasLeftHidden && hasRightHidden:
        default: {
          pages = [LEFT_ARROW, ...pages, RIGHT_ARROW];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const TOTAL_PAGES = Math.ceil(totalItems / cardsPerPage);
  const pages = getPageNumbers(TOTAL_PAGES, pageNumber, 2);

  const prevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber === TOTAL_PAGES) return;
    setPageNumber(pageNumber + 1);
  };

  const toPage = (event: MouseEvent<HTMLElement>) => {
    const { textContent } = event.target as HTMLElement;
    setPageNumber(+textContent!);
  };

  return (
    <ul className={styles.pagination}>
      {pages.map((page) => {
        if (page === LEFT_ARROW)
          return (
            <li key={page} className={styles.pagination__item}>
              <Link to={`?page=${pageNumber - 1}`} onClick={prevPage}>
                &laquo;
              </Link>
            </li>
          );

        if (page === RIGHT_ARROW)
          return (
            <li key={page} className={styles.pagination__item}>
              <Link to={`?page=${pageNumber + 1}`} onClick={nextPage}>
                &raquo;
              </Link>
            </li>
          );

        return (
          <li key={page} className={`${styles.pagination__item} ${pageNumber === +page ? styles.active : ''}`}>
            <Link to={`?page=${page}`} onClick={toPage}>
              {page}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
