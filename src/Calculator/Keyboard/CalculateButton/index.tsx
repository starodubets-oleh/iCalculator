import React from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import BaseButton, { IBaseButtonProps } from '../BaseButton';

interface ICalculateButtonProps extends Omit<IBaseButtonProps, 'onClick' | 'children'> { }

const CalculateButton = (props: ICalculateButtonProps) => {
  const { computeResult } = useCalculatorContext();

  return (
    <BaseButton
      color="orange"
      {...props}
      onClick={computeResult}
    >
      =
    </BaseButton>
  )
}

export default CalculateButton;