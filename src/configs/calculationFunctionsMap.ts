import MathAction from "../enums/mathAction";
import TCalculationFunction from "../types/TCalculationFunction";
import { add, divide, minus, multiply } from "../utils/calculationFunctions";

const calculationFunctionMap: Record<MathAction, TCalculationFunction> = {
  [MathAction.Add]: add,
  [MathAction.Minus]: minus,
  [MathAction.Divide]: divide,
  [MathAction.Multiply]: multiply,
}

export default calculationFunctionMap;