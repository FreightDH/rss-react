import { useEffect, useState } from 'react';

const usePagination = (url: string, pageNumber: number, cardsPerPage: number) => {
  const [data, setData] = useState({
    count: 0,
    next: '',
    prev: '',
    results: [],
  });

  useEffect(() => {
    const offset = pageNumber - 1;

    fetch(`${url}?offset=${offset * cardsPerPage}&limit=${cardsPerPage}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [cardsPerPage, pageNumber, url]);

  return data;
};

export default usePagination;
