import type { CalculatorProps } from './Calculator.types';

import React, { useState, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import classNames from 'classnames';
import { CalculationState, ModifierTypes, MrcState } from './Calculator.types';
import * as helpers from './Calculator.helpers';
import './_calculator.scss';

export const Calculator = ({ onModalClose }: CalculatorProps) => {
  const [calculation, setCalculation] = useState<CalculationState>(new CalculationState(ModifierTypes.NONE, 0, '0', 0));
  const [mrcValues, setMrcValues] = useState<MrcState>(new MrcState(0, 0));
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const onNumberClicked = (numString: string) => () => {
    setActiveButton(numString);

    setTimeout(() => setActiveButton(null), 100);

    if (numString === '.' && calculation.text.includes('.')) {
      return;
    }

    const text = helpers.formatDisplayText(calculation.text === '0' ? numString ?? '' : calculation.text + numString);
    const value = helpers.formatDisplay(eval(text));

    setCalculation({
      ...calculation,
      modifier: calculation.modifier,
      text,
      value,
      answer: Number(!calculation.modifier ? 0 : helpers.formatDisplay(calculation.answer)),
    });
  };

  const onBackspaceClicked = () => {
    const text = calculation.text.slice(0, -1) === '' ? '0' : calculation.text.slice(0, -1);
    const value = helpers.formatDisplay(eval(text));

    setCalculation({
      ...calculation,
      text,
      value,
    });
  };

  const onModifierClicked = (inModifier: ModifierTypes) => () => {
    setActiveButton(inModifier);
    setTimeout(() => setActiveButton(null), 100);

    const newAnswer: number = helpers.formatDisplay(helpers.getAnswerAfterModifier(calculation, inModifier));
    setCalculation({
      ...calculation,
      modifier: inModifier,
      value: 0,
      text: '0',
      answer: newAnswer,
    });
  };

  const onSpecialModifierClicked = (inModifier: ModifierTypes) => () => {
    const newAnswer: number = helpers.getAnswerAfterSpecialModifier(calculation, inModifier);

    setCalculation({
      ...calculation,
      modifier: calculation.modifier,
      value: 0,
      text: '0',
      answer: helpers.formatDisplay(newAnswer),
    });
  };

  const onMMinusClicked = () => {
    if (calculation.value !== 0 || calculation.answer !== 0) {
      setMrcValues({
        mPlus: mrcValues.mPlus,
        mMinus: calculation.value !== 0 ? calculation.value : calculation.answer,
      });
    }
  };

  const onMPlusClicked = () => {
    if (calculation.value !== 0 || calculation.answer !== 0) {
      setMrcValues({
        mPlus: calculation.value !== 0 ? calculation.value : calculation.answer,
        mMinus: mrcValues.mMinus,
      });
    }
  };

  const onMRCClicked = () => {
    // Both M values exist. Cycle between two.
    const bBothMValuesExist: boolean = mrcValues.mMinus !== 0 && mrcValues.mPlus !== 0;
    if (bBothMValuesExist) {
      if (mrcValues.mMinus !== calculation.value) {
        setCalculation({
          ...calculation,
          modifier: calculation.modifier,
          value: mrcValues.mMinus,
          answer: calculation.answer,
        });
      } else {
        setCalculation({
          ...calculation,
          modifier: calculation.modifier,
          value: mrcValues.mPlus,
          answer: calculation.answer,
        });
      }
    }
    // Set calculation value to saved M value.
    else {
      if (mrcValues.mMinus !== 0 && mrcValues.mMinus !== calculation.value) {
        setCalculation({
          ...calculation,
          modifier: calculation.modifier,
          value: mrcValues.mMinus,
          answer: calculation.answer,
        });
      } else if (mrcValues.mPlus !== 0 && mrcValues.mPlus !== calculation.value) {
        setCalculation({
          ...calculation,
          modifier: calculation.modifier,
          value: mrcValues.mPlus,
          answer: calculation.answer,
        });
      }
    }
  };

  const onSubmitClicked = () => {
    setActiveButton('=');
    setTimeout(() => setActiveButton(null), 100);

    if (calculation.modifier && calculation.value) {
      // Maybe come back and add exception for divide by zero error
      setCalculation({
        ...calculation,
        modifier: ModifierTypes.NONE,
        value: 0,
        text: '0',
        answer: helpers.performCalculation(calculation.answer, calculation.value, calculation.modifier),
      });
    }
  };

  const onClearClicked = () => {
    // Clear MRC if clear was clicked multiple times.
    if (calculation.value === 0 && calculation.answer === 0) {
      setMrcValues({
        mMinus: 0,
        mPlus: 0,
      });
    }

    setCalculation({
      ...calculation,
      modifier: ModifierTypes.NONE,
      value: 0,
      text: '0',
      answer: 0,
    });
  };

  const onSpecialKeyClicked = (event: KeyboardEvent) => {
    switch (event.key) {
      case '+':
        onModifierClicked(ModifierTypes.plus)();
        break;
      case '-':
        onModifierClicked(ModifierTypes.minus)();
        break;
      case '*':
        onModifierClicked(ModifierTypes.multiply)();
        break;
      case '/':
        onModifierClicked(ModifierTypes.divide)();
        break;

      default:
        break;
    }
  };

  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].forEach((key) => {
    useHotkeys(key, onNumberClicked(key), { preventDefault: true });
  });

  useHotkeys('backspace', onBackspaceClicked, { preventDefault: true });
  useHotkeys('enter', onSubmitClicked, { preventDefault: true });
  useHotkeys('escape', () => onModalClose?.(), { preventDefault: true });

  useEffect(() => {
    window.addEventListener('keydown', onSpecialKeyClicked);

    return () => {
      window.removeEventListener('keydown', onSpecialKeyClicked);
    };
  }, [onSpecialKeyClicked]);

  return (
    <div className="calculator__container">
      <div className="calculator__display-box">
        <h4 className="calculator__display-text--mrc">{mrcValues.mMinus > 0 || mrcValues.mPlus > 0 ? 'M' : ''}</h4>
        <h3 className="calculator__display-text">
          {calculation.value ? calculation.value : helpers.getDisplayableAnswer(calculation.answer)}
        </h3>
      </div>

      <div className="calculator__solar-label">
        <div className="calculator__solar-text">
          <p>TEXAS INSTRUMENTS</p>
          <h2 className="calculator__solar-name">TI-108</h2>
        </div>
      </div>

      {/* Buttons Area */}
      <div className="calculator__buttons">
        <div className="calculator__buttons-grid--left">
          <button
            className="calculator__button calculator__button-modifier"
            onClick={onSpecialModifierClicked(ModifierTypes.plusminus)}
          >
            +/-
          </button>
          <button
            className="calculator__button calculator__button-modifier"
            onClick={onSpecialModifierClicked(ModifierTypes.sqrt)}
          >
            &#8730;
          </button>
          <button
            className="calculator__button calculator__button-modifier"
            onClick={onSpecialModifierClicked(ModifierTypes.percent)}
          >
            %
          </button>

          <button className="calculator__button calculator__button-modifier" onClick={onMRCClicked}>
            MRC
          </button>
          <button className="calculator__button calculator__button-modifier" onClick={onMMinusClicked}>
            M-
          </button>
          <button className="calculator__button calculator__button-modifier" onClick={onMPlusClicked}>
            M+
          </button>

          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '7',
            })}
            onClick={onNumberClicked('7')}
          >
            7
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '8',
            })}
            onClick={onNumberClicked('8')}
          >
            8
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '9',
            })}
            onClick={onNumberClicked('9')}
          >
            9
          </button>

          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '4',
            })}
            onClick={onNumberClicked('4')}
          >
            4
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '5',
            })}
            onClick={onNumberClicked('5')}
          >
            5
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '6',
            })}
            onClick={onNumberClicked('6')}
          >
            6
          </button>

          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '1',
            })}
            onClick={onNumberClicked('1')}
          >
            1
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '2',
            })}
            onClick={onNumberClicked('2')}
          >
            2
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '3',
            })}
            onClick={onNumberClicked('3')}
          >
            3
          </button>

          <button className="calculator__button calculator__button-modifier" onClick={onClearClicked}>
            ON/C
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '0',
            })}
            onClick={onNumberClicked('0')}
          >
            0
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-number': true,
              'calculator__button-is--active': activeButton === '.',
            })}
            onClick={onNumberClicked('.')}
          >
            .
          </button>
        </div>

        <div className="calculator__buttons-grid--right">
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-modifier': true,
              'calculator__button-is--active': activeButton === ModifierTypes.divide,
            })}
            onClick={onModifierClicked(ModifierTypes.divide)}
          >
            &#247;
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-modifier': true,
              'calculator__button-is--active': activeButton === ModifierTypes.multiply,
            })}
            onClick={onModifierClicked(ModifierTypes.multiply)}
          >
            x
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-modifier': true,
              'calculator__button-is--active': activeButton === ModifierTypes.minus,
            })}
            onClick={onModifierClicked(ModifierTypes.minus)}
          >
            -
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-modifier': true,
              'calculator__button-is--active': activeButton === ModifierTypes.plus,
            })}
            onClick={onModifierClicked(ModifierTypes.plus)}
          >
            +
          </button>
          <button
            className={classNames({
              calculator__button: true,
              'calculator__button-submit': true,
              'calculator__button-is--active': activeButton === '=',
            })}
            onClick={onSubmitClicked}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};
