import { ReactElement } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { API_URL } from 'shared';
import useScrollBlock from 'hooks/useScrollBlock';
import PokemonCard from 'components/ListSection/PokemonCard/PokemonCard';

import cross from 'assets/cross.svg';
import styles from './Details.module.scss';

const Details = (): ReactElement => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [blockScroll, allowScroll] = useScrollBlock();
  const pokemonName = searchParams.get('details');

  if (pokemonName) {
    const requestURL = API_URL + pokemonName;
    blockScroll();

    return (
      <>
        <div className={styles.details}>
          <div className={styles.details__body} onClick={() => navigate(-1)}>
            <div className={styles.details__content} onClick={(event) => event.stopPropagation()}>
              <button className={styles.details__close} onClick={() => navigate(-1)}>
                <img src={cross} alt="cross" />
              </button>
              <PokemonCard requestURL={requestURL} details={true} />
            </div>
          </div>
        </div>
      </>
    );
  }

  allowScroll();
  return <></>;
};

export default Details;
