import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import styles from './PokemonCard.module.scss';
import cardsColors from './cardsColors';

interface PokemonCardProps {
  requestURL: string;
  details: boolean;
}

const PokemonCard: FC<PokemonCardProps> = ({ requestURL, details }): ReactElement => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [statuses, setStatuses] = useState({ isLoading: false, isBadRequest: false });

  const getPokemonData = useCallback(async () => {
    setStatuses({ isBadRequest: false, isLoading: true });

    try {
      const res = await fetch(requestURL);
      const data = await res.json();
      setPokemonData(data);
    } catch (error) {
      setStatuses({ isBadRequest: true, isLoading: false });
      throw new Error('Invalid pokemon name!');
    }

    setStatuses({ isBadRequest: false, isLoading: false });
  }, [requestURL]);

  useEffect(() => {
    getPokemonData();
  }, [getPokemonData]);

  if (statuses.isLoading) {
    return <RotatingLines width="40" strokeColor="#353535" strokeWidth="5" animationDuration="0.75" visible={true} />;
  }

  if (statuses.isBadRequest) {
    return <p>{"Pokemon wasn't found! Please, enter the other name."}</p>;
  }

  if (pokemonData !== null) {
    if (!details) {
      return (
        <div className={styles.card}>
          <div className={styles.card__image}>
            <img src={pokemonData!.sprites.other.dream_world.front_default} alt="pokemon" />
          </div>
          <h2 className={styles.card__name}>{pokemonData!.name[0].toUpperCase() + pokemonData!.name.slice(1)}</h2>
        </div>
      );
    }

    return (
      <div
        className={styles.details}
        style={{
          background: `radial-gradient(circle at 50% 0%, ${
            cardsColors[pokemonData!.types[0].type.name]
          } 36%, #ffffff 36%)`,
        }}
      >
        <p className={styles.details__health}>
          <span>HP</span>
          {`'${pokemonData!.stats[0].base_stat}'`}
        </p>
        <div className={styles.details__image}>
          <img src={pokemonData!.sprites.other.dream_world.front_default} alt="pokemon" />
        </div>
        <h2 className={styles.details__name}>{pokemonData!.name[0].toUpperCase() + pokemonData!.name.slice(1)}</h2>
        <ul className={styles.details__types}>
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
        <ul className={styles.details__stats}>
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
      </div>
    );
  }

  return <></>;
};

export default PokemonCard;
