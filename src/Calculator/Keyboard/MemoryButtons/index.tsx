import React, { ReactElement, useCallback } from 'react';
import { useCalculatorContext } from '../../../CalculatorProvider';
import { add, minus } from '../../../utils/calculationFunctions';
import BaseButton from '../BaseButton';

const MemoryButtons = (): ReactElement => {
  const { memorizedValue, setMemorizedValue, setValue, value } = useCalculatorContext();

  const handleClearMemoryButtonClick = useCallback(
    (): void => {
      setMemorizedValue(0);
    },
    [setMemorizedValue],
  );

  const handleUseMemorizedValueButtonClick = useCallback(
    (): void => {
      setValue(memorizedValue);
    },
    [memorizedValue, setValue],
  );

  const handleAddToMemorizedValue = useCallback(
    () => {
      setMemorizedValue(add(memorizedValue, Number(value)));
    },
    [memorizedValue, setMemorizedValue, value],
  );

  const handleMinusFromMemorizedValue = useCallback(
    (): void => {
      setMemorizedValue(minus(memorizedValue, Number(value)));
    },
    [memorizedValue, setMemorizedValue, value],
  )

  return (
    <>
      <BaseButton onClick={handleClearMemoryButtonClick}>mc</BaseButton>
      <BaseButton onClick={handleUseMemorizedValueButtonClick}>mr</BaseButton>
      <BaseButton onClick={handleMinusFromMemorizedValue} >m-</BaseButton>
      <BaseButton
        color="orange"
        selected={!!memorizedValue}
        onClick={handleAddToMemorizedValue}
      >
        m+
      </BaseButton>
    </>
  )
}

export default MemoryButtons;