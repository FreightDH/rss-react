import { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NumberInput.module.scss';

interface NumberInputProps {
  cardsPerPage: number;
  setCardsPerPage: (count: number) => void;
  setPageNumber: (page: number) => void;
  totalItems: number;
}

const NumberInput: FC<NumberInputProps> = ({
  cardsPerPage,
  setCardsPerPage,
  setPageNumber,
  totalItems,
}): ReactElement => {
  const navigate = useNavigate();

  const handleDecrementClick = () => {
    if (cardsPerPage > 1) {
      setCardsPerPage(cardsPerPage - 1);
      setPageNumber(1);
      navigate('/');
    }
  };

  const handleIncrementClick = () => {
    if (cardsPerPage < totalItems) {
      setCardsPerPage(cardsPerPage + 1);
      setPageNumber(1);
      navigate('/');
    }
  };

  return (
    <div className={styles.input}>
      <label htmlFor="cardsPerPage" className={styles.input__label}>
        Cards count
      </label>
      <div className={styles.input__control}>
        <input type="number" name="cardsPerPage" className={styles.input__input} readOnly value={cardsPerPage} />
        <button className={styles.input__btn} onClick={handleDecrementClick}>
          -
        </button>
        <button className={styles.input__btn} onClick={handleIncrementClick}>
          +
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
