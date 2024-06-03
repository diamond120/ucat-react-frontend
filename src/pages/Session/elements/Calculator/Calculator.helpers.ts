import { ModifierTypes, CalculationState } from './Calculator.types';

export const formatDisplayText = (inValue: string) => {
  if (inValue.length > 10) {
    return inValue.substring(0, 10);
  }

  return inValue;
};

export const formatDisplay = (inValue: number) => {
  return inValue;

  const inValueString: string = inValue.toString();
  if (inValueString.length > 10) {
    return Number(inValueString.substring(0, 10));
  }

  return inValue;
};

export const formatDot = (inValue: string | number) => {
  let valueString = inValue.toString();
  if (!valueString.includes('.')) valueString += '.';
  return valueString;
};

export const performCalculation = (value1: number, value2: number, modifier: ModifierTypes) => {
  switch (modifier) {
    case ModifierTypes.plus:
      return value1 + value2;
    case ModifierTypes.divide:
      return value1 / value2;
    case ModifierTypes.multiply:
      return value1 * value2;
    case ModifierTypes.minus:
      return value1 - value2;
    default:
      console.error('Modifier (' + modifier + ') not found.');
      return 0;
  }
};

export const getAnswerAfterModifier = (inCalculation: CalculationState, inModifier: ModifierTypes) => {
  if (!inCalculation.value) {
    return inCalculation.answer;
  } else if (!inCalculation.answer) {
    return inCalculation.value;
  } else {
    return performCalculation(inCalculation.answer, inCalculation.value, inModifier);
  }
};

export const getAnswerAfterSpecialModifier = (inCalculation: CalculationState, inModifier: ModifierTypes) => {
  switch (inModifier) {
    case ModifierTypes.plusminus:
      if (inCalculation.value) {
        return inCalculation.value * -1;
      } else {
        return inCalculation.answer * -1;
      }
    case ModifierTypes.sqrt:
      if (inCalculation.value) {
        return Math.sqrt(inCalculation.value);
      } else {
        return Math.sqrt(inCalculation.answer);
      }
    case ModifierTypes.percent:
      if (inCalculation.value) {
        const percentage = inCalculation.answer * (inCalculation.value * 0.01);
        return performCalculation(inCalculation.answer, percentage, inCalculation.modifier);
      } else {
        return 0;
      }
    default:
      console.error('No special modifier case for: ' + inModifier);
      return inCalculation.value;
  }
};

export const getDisplayableAnswer = (displayNumber: number) => {
  console.log(displayNumber);
  const displayNumberString: string = displayNumber.toString();
  if (displayNumberString.length > 8) {
    const dot = displayNumberString.indexOf('.');
    if(dot > 0 && dot < 6 && !displayNumberString.includes('e+')) return displayNumber.toFixed(8 - dot);
    // Only display 6 decimal places.
    return displayNumber.toExponential(5);
  }

  return displayNumber;
};
