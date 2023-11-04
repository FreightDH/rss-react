import { ReactElement, useCallback, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import cardsColors from './cardsColors';
import styles from './PokemonCard.module.scss';

interface PokemonCardProps {
  requestURL: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ requestURL }): ReactElement => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [statuses, setStatuses] = useState({ isLoading: false, isBadRequest: false });

  const fetchPokemonData = useCallback(async () => {
    try {
      setStatuses({ isBadRequest: false, isLoading: true });
      const res = await fetch(requestURL);
      const data: PokemonData = await res.json();
      setPokemonData(data);
      setStatuses({ isBadRequest: false, isLoading: false });
    } catch (error) {
      setStatuses({ isLoading: false, isBadRequest: true });
      throw new Error('Invalid pokemon name!');
    }
  }, [requestURL]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData]);

  if (statuses.isLoading) {
    return <RotatingLines width="40" strokeColor="#353535" strokeWidth="5" animationDuration="0.75" visible={true} />;
  }

  if (statuses.isBadRequest) {
    return <p>{"Pokemon wasn't found! Please, enter the other name."}</p>;
  }

  if (pokemonData !== null) {
    return (
      <li
        className={styles.card}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${
            cardsColors[pokemonData!.types[0].type.name]
          } 36%, #ffffff 36%)`,
        }}
      >
        <p className={styles.card__health}>
          <span>HP</span>
          {`'${pokemonData!.stats[0].base_stat}'`}
        </p>
        <div className={styles.card__image}>
          <img src={pokemonData!.sprites.other.dream_world.front_default} alt="pokemon" />
        </div>
        <h2 className={styles.card__name}>{pokemonData!.name[0].toUpperCase() + pokemonData!.name.slice(1)}</h2>
        <ul className={styles.card__types}>
          {pokemonData!.types.map((item, index) => (
            <li
              className={styles.types__item}
              style={{ backgroundColor: `${cardsColors[pokemonData!.types[index].type.name]}` }}
              key={index}
            >
              {item.type.name}
            </li>
          ))}
        </ul>
        <ul className={styles.card__stats}>
          <li className={styles.stats__item}>
            <h3 className={styles.item__stat}>{pokemonData!.stats[1].base_stat}</h3>
            <p className={styles.item__name}>Attack</p>
          </li>
          <li className={styles.stats__item}>
            <h3 className={styles.item__stat}>{pokemonData!.stats[2].base_stat}</h3>
            <p className={styles.item__name}>Defense</p>
          </li>
          <li className={styles.stats__item}>
            <h3 className={styles.item__stat}>{pokemonData!.stats[5].base_stat}</h3>
            <p className={styles.item__name}>Speed</p>
          </li>
        </ul>
      </li>
    );
  }

  return <></>;
};

export default PokemonCard;
