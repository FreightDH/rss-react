import { ReactElement } from 'react';
import usePokemon from 'utils/contexts/usePokemon';
import NumberInput from './NumberInput/NumberInput';
import Pagination from './Pagination/Pagination';
import styles from './Controls.module.scss';

const ControlsSection = (): ReactElement => {
  const { controlsDisabled } = usePokemon();

  if (controlsDisabled) return <></>;

  return (
    <div className={styles.controls}>
      <NumberInput />
      <Pagination />
    </div>
  );
};

export default ControlsSection;
