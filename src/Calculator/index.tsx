import React, { ReactElement } from 'react';
import CalculatorProvider from '../CalculatorProvider';
import Input from './Input';
import Keyboard from './Keyboard';

import styles from './styles.module.scss';

const Calculator = (): ReactElement => (
  <CalculatorProvider>
    <div className={styles.calculator}>
      <Input />
      <Keyboard />
    </div>
  </CalculatorProvider>
)

export default Calculator;