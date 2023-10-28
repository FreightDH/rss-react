declare module '*.module.scss' {
  const styles: { [key: string]: string };
  export default styles;
}

type Data = {
  count: number;
  next: string | null;
  prev: string | null;
  results: Array<Record<string, string>>;
} | null;

type PokemonData = {
  id: number;
  stats: [
    { base_stat: number },
    { base_stat: number },
    { base_stat: number },
    { base_stat: number },
    { base_stat: number },
    { base_stat: number },
  ];
  name: string;
  sprites: {
    other: { dream_world: { front_default: string } };
  };
  types: [{ type: { name: string } }];
} | null;
