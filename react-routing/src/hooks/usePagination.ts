import { useEffect, useState } from 'react';

const usePagination = (url: string, pageNumber: number) => {
  const [data, setData] = useState({
    count: 0,
    next: '',
    prev: '',
    results: [],
  });

  useEffect(() => {
    const offset = pageNumber - 1;

    fetch(`${url}?offset=${offset * 20}&limit=20`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [pageNumber, url]);

  return data;
};

export default usePagination;
