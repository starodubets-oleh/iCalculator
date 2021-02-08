import React, { ReactElement, ReactNode } from 'react';

import styles from './styles.module.scss';

interface IButtonRowProps {
  children: ReactNode;
}

const ButtonsRow = ({ children }: IButtonRowProps): ReactElement => (
  <div className={styles.buttonsRow}>
    {children}
  </div>
)

export default ButtonsRow;