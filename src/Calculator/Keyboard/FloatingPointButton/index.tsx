import React, { useCallback } from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import BaseButton, { IBaseButtonProps } from '../BaseButton';

interface IFloatingPointButtonProps extends Omit<IBaseButtonProps, 'onClick'> { }

const FloatingPointButton = (props: IFloatingPointButtonProps) => {
  const { setWithFloatingPoint } = useCalculatorContext();

  const handleFloatingPointButtonClick = useCallback(
    (): void => {
      setWithFloatingPoint(true);
    },
    [setWithFloatingPoint],
  )


  return (
    <BaseButton
      {...props}
      onClick={handleFloatingPointButtonClick}
    >
      ,
    </BaseButton>
  )
}

export default FloatingPointButton;
