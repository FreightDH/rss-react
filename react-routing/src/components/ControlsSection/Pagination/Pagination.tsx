import { FC, MouseEvent, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import useParamsObject from 'hooks/useParamsObject';
import { getArrayFromRange, getSearchPath } from 'utils';

import styles from './Pagination.module.scss';

interface PaginationProps {
  totalItems: number;
  cardsPerPage: number;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

const LEFT_ARROW = 'LEFT';
const RIGHT_ARROW = 'RIGHT';

const Pagination: FC<PaginationProps> = ({ totalItems, cardsPerPage, pageNumber, setPageNumber }): ReactElement => {
  const searchQueries = useParamsObject();
  const totalPages = Math.ceil(totalItems / cardsPerPage);

  const getPageNumbers = (totalPages: number, currentPage: number, pageNeighbours: number) => {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalButtons = totalNumbers + 2;

    if (totalPages > totalButtons) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = getArrayFromRange(startPage, endPage);

      const hasLeftHidden = startPage > 2;
      const hasRightHidden = totalPages - endPage > 1;
      const hiddenTotal = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftHidden && !hasRightHidden: {
          const extraPages = getArrayFromRange(startPage - hiddenTotal, startPage - 1);
          pages = [LEFT_ARROW, ...extraPages, ...pages];
          break;
        }

        case !hasLeftHidden && hasRightHidden: {
          const extraPages = getArrayFromRange(endPage + 1, endPage + hiddenTotal);
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

    return getArrayFromRange(1, totalPages);
  };

  const pageNumbers = getPageNumbers(totalPages, pageNumber, 2);

  const prevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };

  const nextPage = () => {
    if (pageNumber === totalPages) return;
    setPageNumber(pageNumber + 1);
  };

  const toPage = (event: MouseEvent<HTMLElement>) => {
    const { textContent } = event.target as HTMLElement;
    setPageNumber(+textContent!);
  };

  return (
    <ul className={styles.pagination}>
      {pageNumbers.map((number) => {
        switch (true) {
          case number === LEFT_ARROW: {
            searchQueries['page'] = `${pageNumber - 1}`;
            const path = getSearchPath(searchQueries);

            return (
              <li key={number} className={styles.pagination__item}>
                <Link to={`?${path}`} onClick={prevPage}>
                  &laquo;
                </Link>
              </li>
            );
          }

          case number === RIGHT_ARROW: {
            searchQueries['page'] = `${pageNumber + 1}`;
            const path = getSearchPath(searchQueries);

            return (
              <li key={number} className={styles.pagination__item}>
                <Link to={`?${path}`} onClick={nextPage}>
                  &raquo;
                </Link>
              </li>
            );
          }

          default: {
            searchQueries['page'] = `${number}`;
            const path = getSearchPath(searchQueries);

            return (
              <li key={number} className={`${styles.pagination__item} ${pageNumber === +number ? styles.active : ''}`}>
                <Link to={`?${path}`} onClick={toPage}>
                  {number}
                </Link>
              </li>
            );
          }
        }
      })}
    </ul>
  );
};

export default Pagination;
