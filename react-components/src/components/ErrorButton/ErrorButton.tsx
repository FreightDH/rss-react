import { ReactElement, useState } from 'react';
import styles from './ErrorButton.module.scss';

const ErrorButton = (): ReactElement => {
  const [hasError, setErrorState] = useState(false);

  const handleErrorButtonClick = () => {
    setErrorState(true);
  };

  if (hasError) {
    throw new Error('You clicked on the throw error button!');
  }

  return (
    <button className={styles.button} onClick={handleErrorButtonClick}>
      Throw an error
    </button>
  );
};

export default ErrorButton;
