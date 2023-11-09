const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const getArrayFromRange = (from: number, to: number, step: number = 1): string[] => {
  const result = [];

  for (let i = from; i <= to; i += step) {
    result.push(i.toString());
  }

  return result;
};

const getSearchPath = (searchQueries: Record<string, string | null>) => {
  const path = [];

  for (const key in searchQueries) {
    path.push(`${key}=${searchQueries[key]}`);
  }

  return path.join('&');
};

export { API_URL, getArrayFromRange, getSearchPath };
