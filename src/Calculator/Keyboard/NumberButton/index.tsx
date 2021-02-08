import React, { useCallback } from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import BaseButton, { IBaseButtonProps } from '../BaseButton';

interface INumberButtonProps extends Omit<IBaseButtonProps, 'onClick' | 'children'> {
  value: number;
}

const NumberButton = (props: INumberButtonProps) => {
  const { addToValue } = useCalculatorContext();

  const handleClick = useCallback(
    (): void => {
      addToValue(Number(props.value));
    },
    [addToValue, props.value],
  )
  return (
    <BaseButton
      {...props}
      onClick={handleClick}
    >
      {props.value}
    </BaseButton>
  )
}

export default NumberButton