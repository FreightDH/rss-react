import { useSearchParams } from 'react-router-dom';

const useParamsObject = () => {
  const [searchParams] = useSearchParams();
  const searchQueries: Record<string, string> = {};
  for (const key of searchParams.keys()) {
    searchQueries[key] = searchParams.get(key)!;
  }

  return searchQueries;
};

export default useParamsObject;
