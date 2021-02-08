import React, { ReactElement } from 'react';
import MathAction from '../../enums/mathAction';
import CalculateButton from './CalculateButton';
import ChangeSignButton from './ChangeSignButton';
import ClearButton from './ClearButton';
import FloatingPointButton from './FloatingPointButton';
import MathActionButton from './MathActionButton';
import MemoryButtons from './MemoryButtons';
import NumberButton from './NumberButton';
import PercentageButton from './PercentageButton';

import styles from './styles.module.scss';

const Keyboard = (): ReactElement => (
  <div className={styles.keyboard}>

    <ClearButton />
    <ChangeSignButton />
    <PercentageButton />
    <MathActionButton
      value={MathAction.Divide}
      title="÷"
    />

    <MemoryButtons />

    <NumberButton value={7} />
    <NumberButton value={8} />
    <NumberButton value={9} />
    <MathActionButton
      value={MathAction.Multiply}
      title="×"
    />

    <NumberButton value={4} />
    <NumberButton value={5} />
    <NumberButton value={6} />
    <MathActionButton
      value={MathAction.Minus}
      title="-"
    />

    <NumberButton value={1} />
    <NumberButton value={2} />
    <NumberButton value={3} />
    <MathActionButton
      value={MathAction.Add}
      title="+"
    />

    <NumberButton
      className={styles.zeroButton}
      value={0}
    />
    <FloatingPointButton />
    <CalculateButton />
  </div >
);

export default Keyboard;