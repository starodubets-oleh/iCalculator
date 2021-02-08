import React, { createContext, useContext, useMemo, useState, useCallback, ReactElement, ReactNode, useEffect } from 'react';
import calculationFunctionMap from '../configs/calculationFunctionsMap';
import MathAction from '../enums/mathAction';
import { getMaxFloatingNumbersCount } from '../utils/floatingNumbersHelpers';

const MAX_NUMBERS_COUNT = 9;

type TMathAction = MathAction | null;

interface ICalculatorContext {
  value: string | number;
  setValue: (value: number) => void;
  addToValue: (value: number) => void;
  mathAction: TMathAction;
  setMathAction: (action: TMathAction) => void;
  secondValue: number;
  setSecondValue: (value: number) => void;
  clear: () => void;
  computeResult: () => void;
  memorizedValue: number;
  setMemorizedValue: (value: number) => void;
  withFloatingPoint: boolean;
  setWithFloatingPoint: (value: boolean) => void;
  displayingValue: string | number;
  clearCurrentValue: () => void;
  isValueExist: boolean;
}

interface ICalculatorProviderProps {
  children: ReactNode;
}

const defaultValue: ICalculatorContext = {
  value: 0,
  setValue: (): void => { },
  addToValue: (): void => { },
  mathAction: null,
  setMathAction: (): void => { },
  secondValue: 0,
  setSecondValue: (): void => { },
  clear: (): void => { },
  computeResult: (): void => { },
  memorizedValue: 0,
  setMemorizedValue: (): void => { },
  withFloatingPoint: false,
  setWithFloatingPoint: (): void => { },
  displayingValue: 0,
  clearCurrentValue: (): void => { },
  isValueExist: false,
};

const CalculatorProviderContext = createContext<ICalculatorContext>(defaultValue);

const CalculatorProvider = ({ children }: ICalculatorProviderProps): ReactElement => {
  const [currentValue, setCurrentValue] = useState<string | number>(defaultValue.value);
  const [currentSecondValue, setCurrentSecondValue] = useState<number>(defaultValue.secondValue);
  const [currentMathAction, setCurrentMathAction] = useState<TMathAction>(defaultValue.mathAction);
  const [lastMathAction, setLastMathAction] = useState<TMathAction>(defaultValue.mathAction);
  const [isActionStarted, setIsActionStarted] = useState<boolean>(false);
  const [currentMemorizedValue, setCurrentMemorizedValue] = useState<number>(defaultValue.memorizedValue);
  const [withFloatingPoint, setWithFloatingPoint] = useState<boolean>(false);
  const [currentDisplayingValue, setCurrentDisplayingValue] = useState<string | number>(defaultValue.displayingValue);
  const [floatingNumbersCount, setFloatingNumbersCount] = useState<number>(0);

  const handleClear = useCallback(
    (): void => {
      setCurrentValue(defaultValue.value);
      setCurrentSecondValue(defaultValue.secondValue);
      setCurrentMathAction(defaultValue.mathAction);
      setIsActionStarted(false);
      setLastMathAction(defaultValue.mathAction);
      setWithFloatingPoint(false);
      setCurrentDisplayingValue(defaultValue.displayingValue);
      setFloatingNumbersCount(0);
    },
    [],
  );

  const handleClearCurrentValue = useCallback(
    (): void => {
      setCurrentValue(defaultValue.value);
      setWithFloatingPoint(false);
      setFloatingNumbersCount(0);
    },
    [],
  );

  const handleSetMathAction = useCallback(
    (action: TMathAction): void => {
      setCurrentSecondValue(Number(currentValue));
      setIsActionStarted(true);
      setCurrentMathAction(action);
      setWithFloatingPoint(false);
      setFloatingNumbersCount(0);
    },
    [currentValue],
  );

  const handleComputeResult = useCallback(
    (): (() => void) | void => {
      if (currentMathAction) {
        const cache = Number(currentValue);

        const maxFloatingNumbersCount = getMaxFloatingNumbersCount(currentSecondValue, Number(currentValue));

        const computedValue = Number(Number(calculationFunctionMap[currentMathAction](currentSecondValue, Number(currentValue))).toFixed(maxFloatingNumbersCount));

        setCurrentValue(computedValue);
        setCurrentSecondValue(cache);
        setLastMathAction(currentMathAction);
        setCurrentMathAction(defaultValue.mathAction);
        setIsActionStarted(false);
      } else if (lastMathAction) {
        setCurrentValue(calculationFunctionMap[lastMathAction](Number(currentValue), currentSecondValue));
      }

      setFloatingNumbersCount(0);

    },
    [currentMathAction, currentSecondValue, currentValue, lastMathAction],
  );

  const handleAddToValue = useCallback(
    (value: number): void => {
      if (Number(currentValue).toString().length + floatingNumbersCount === MAX_NUMBERS_COUNT) {
        return;
      }

      let preparedValue = value;

      if (withFloatingPoint && Number(currentValue) % 1 === 0 && value !== 0 && floatingNumbersCount === 0) {
        preparedValue = Number(`${currentValue}.${value}`);
        setFloatingNumbersCount((prevValue: number): number => prevValue + 1);
      } else if (withFloatingPoint && value === 0) {
        setFloatingNumbersCount((prevValue: number): number => prevValue + 1);
        return;
      } else if (floatingNumbersCount > 0 && value !== 0) {
        setFloatingNumbersCount((prevValue: number): number => prevValue + 1);
        preparedValue = Number(currentValue) + Number(`${Number(0).toFixed(floatingNumbersCount)}${value}`);
      } else {
        preparedValue = Number(`${currentValue}${value}`)
      }

      if (isActionStarted) {
        setCurrentValue(value);
        setIsActionStarted(false);
      } else {
        setCurrentValue(preparedValue);
      }
    },
    [currentValue, floatingNumbersCount, isActionStarted, withFloatingPoint],
  );

  useEffect(
    (): void => {
      let displayingValue: string | number = currentValue;

      if (isNaN(Number(currentValue)) || typeof currentValue !== 'number') {
        displayingValue = 'Error';
      } else if (currentValue % 1 === 0 && withFloatingPoint && floatingNumbersCount === 0) {
        displayingValue = `${currentValue},`;
      } else if (withFloatingPoint && floatingNumbersCount > 0) {
        displayingValue = currentValue.toFixed(floatingNumbersCount);
      }

      setCurrentDisplayingValue(displayingValue.toString().replace('.', ','));
    },
    [currentValue, floatingNumbersCount, withFloatingPoint],
  )

  const value = useMemo(
    (): ICalculatorContext => ({
      value: currentValue,
      mathAction: currentMathAction,
      addToValue: handleAddToValue,
      setValue: setCurrentValue,
      setMathAction: handleSetMathAction,
      secondValue: currentSecondValue,
      setSecondValue: setCurrentSecondValue,
      clear: handleClear,
      computeResult: handleComputeResult,
      memorizedValue: currentMemorizedValue,
      setMemorizedValue: setCurrentMemorizedValue,
      withFloatingPoint,
      setWithFloatingPoint,
      displayingValue: currentDisplayingValue,
      clearCurrentValue: handleClearCurrentValue,
      isValueExist: !!currentValue || withFloatingPoint,
    }),
    [currentDisplayingValue, currentMathAction, currentMemorizedValue, currentSecondValue, currentValue, handleAddToValue, handleClear, handleClearCurrentValue, handleComputeResult, handleSetMathAction, withFloatingPoint],
  );

  return (
    <CalculatorProviderContext.Provider value={value}>
      {children}
    </CalculatorProviderContext.Provider>
  );
};

export const useCalculatorContext = (): ICalculatorContext => useContext(CalculatorProviderContext);

export default CalculatorProvider;
