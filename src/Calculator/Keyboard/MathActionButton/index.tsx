import React, { ReactNode, useCallback } from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import MathAction from '../../../enums/mathAction';
import BaseButton, { IBaseButtonProps } from '../BaseButton';

interface IMathActionButtonProps extends Omit<IBaseButtonProps, 'onClick' | 'children' | 'title'> {
  value: MathAction;
  title: ReactNode;
}

const MathActionButton = ({ value, title, ...rest }: IMathActionButtonProps) => {
  const { setMathAction, mathAction } = useCalculatorContext();

  const handleClick = useCallback(
    (): void => {
      setMathAction(value);
    },
    [setMathAction, value],
  )
  return (
    <BaseButton
      selected={mathAction === value}
      color="orange"
      {...rest}
      onClick={handleClick}
    >
      {title}
    </BaseButton>
  )
}

export default MathActionButton