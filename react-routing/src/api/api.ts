const fetchAllData = async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = res.json();
    return data;
  } catch (error) {
    throw new Error("Pokemons data wasn't found! Try again later.");
  }
};

const fetchPokemonData = async (requestURL: string) => {
  try {
    const res = await fetch(requestURL);
    const data = res.json();
    return data;
  } catch (error) {
    throw new Error('Invalid pokemon name!');
  }
};

export { fetchAllData, fetchPokemonData };
