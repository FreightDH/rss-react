import { FC, ReactElement } from 'react';
import NumberInput from './NumberInput/NumberInput';
import Pagination from './Pagination/Pagination';
import styles from './Controls.module.scss';

interface ControlsSectionProps {
  controlsDisabled: boolean;
  totalItems: number;
  cardsPerPage: number;
  pageNumber: number;
  setCardsPerPage: (count: number) => void;
  setPageNumber: (page: number) => void;
}

const ControlsSection: FC<ControlsSectionProps> = ({
  controlsDisabled,
  totalItems,
  cardsPerPage,
  pageNumber,
  setCardsPerPage,
  setPageNumber,
}): ReactElement => {
  if (controlsDisabled) return <></>;

  return (
    <div className={styles.controls}>
      <NumberInput
        totalItems={totalItems}
        cardsPerPage={cardsPerPage}
        setCardsPerPage={setCardsPerPage}
        setPageNumber={setPageNumber}
      />
      <Pagination
        totalItems={totalItems}
        cardsPerPage={cardsPerPage}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default ControlsSection;
