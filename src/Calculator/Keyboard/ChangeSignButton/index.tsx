import React, { useCallback } from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import BaseButton, { IBaseButtonProps } from '../BaseButton';

interface IChangeSignButtonProps extends Omit<IBaseButtonProps, 'onClick' | 'children'> { }

const ChangeSignButton = (props: IChangeSignButtonProps) => {
  const { setValue, value } = useCalculatorContext();

  const handleChangeSignButtonClick = useCallback(
    (): void => {
      setValue(Number(value) - (Number(value) * 2));
    },
    [setValue, value],
  );

  return (
    <BaseButton
      color="light"
      {...props}
      onClick={handleChangeSignButtonClick}
    >
      +/-
    </BaseButton>
  )
}

export default ChangeSignButton;