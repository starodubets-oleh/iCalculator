import React, { ReactElement } from 'react';
import { useCalculatorContext } from '../../CalculatorProvider';

import styles from './styles.module.scss';

const Input = (): ReactElement => {
  const { displayingValue } = useCalculatorContext();

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        value={displayingValue}
        disabled
      />
    </div>
  )
}

export default Input;