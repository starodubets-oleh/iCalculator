import React, { useCallback } from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import BaseButton, { IBaseButtonProps } from '../BaseButton';

interface IClearButtonProps extends Omit<IBaseButtonProps, 'onClick'> { }

const ClearButton = (props: IClearButtonProps) => {
  const { clear, isValueExist, clearCurrentValue } = useCalculatorContext();

  const handleClearButtonClick = useCallback(
    (): void => {
      if (isValueExist) {
        clearCurrentValue();
      } else {
        clear();
      }
    },
    [clear, clearCurrentValue, isValueExist],
  )

  const label = isValueExist ? 'C' : 'AC';

  return (
    <BaseButton
      color="light"
      {...props}
      onClick={handleClearButtonClick}
    >
      {label}
    </BaseButton>
  )
}

export default ClearButton;
