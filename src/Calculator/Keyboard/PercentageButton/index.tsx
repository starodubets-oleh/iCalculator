import React, { useCallback } from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import { divide } from '../../../utils/calculationFunctions';
import BaseButton, { IBaseButtonProps } from '../BaseButton';

const DEFAULT_PERCENTAGE_DIVIDER = 100;

interface IPercentageButtonProps extends Omit<IBaseButtonProps, 'onClick'> { }

const PercentageButton = (props: IPercentageButtonProps) => {
  const { value, setValue, secondValue } = useCalculatorContext();

  const handlePercentageButtonClick = useCallback(
    (): void => {
      if (!value) {
        return;
      }

      if (secondValue) {
        const percentage = divide((Number(value) * secondValue), DEFAULT_PERCENTAGE_DIVIDER);
        setValue(percentage);
      } else {
        const percentage = divide(Number(value), DEFAULT_PERCENTAGE_DIVIDER);
        setValue(percentage);
      }
    },
    [secondValue, setValue, value],
  )

  return (
    <BaseButton
      color="light"
      {...props}
      onClick={handlePercentageButtonClick}
    >
      %
    </BaseButton>
  )
}

export default PercentageButton;
