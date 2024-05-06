import React, { useState } from 'react';
import { CalculationState, ModifierTypes, MrcState } from './Calculator.types';
import * as helpers from './Calculator.helpers';
import './_calculator.scss';

export const Calculator = () => {
  const [calculation, setCalculation] = useState<CalculationState>(new CalculationState(ModifierTypes.NONE, 0, 0));
  const [mrcValues, setMrcValues] = useState<MrcState>(new MrcState(0, 0));

  function onNumberClicked(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLButtonElement;
    const number: number = Number(target.textContent);

    setCalculation({
      ...calculation,
      modifier: calculation.modifier,
      value: Number(helpers.formatDisplay(calculation.value * 10 + number)),
      answer: Number(!calculation.modifier ? 0 : helpers.formatDisplay(calculation.answer)),
    });
  }

  function onModifierClicked(inModifier: ModifierTypes) {
    const newAnswer: number = helpers.formatDisplay(helpers.getAnswerAfterModifier(calculation, inModifier));

    setCalculation({
      ...calculation,
      modifier: inModifier,
      value: 0,
      answer: newAnswer,
    });
  }

  function onSpecialModifierClicked(inModifier: ModifierTypes) {
    const newAnswer: number = helpers.getAnswerAfterSpecialModifier(calculation, inModifier);

    setCalculation({
      ...calculation,
      modifier: calculation.modifier,
      value: 0,
      answer: helpers.formatDisplay(newAnswer),
    });
  }

  function onMMinusClicked() {
    if (calculation.value !== 0 || calculation.answer !== 0) {
      setMrcValues({
        mPlus: mrcValues.mPlus,
        mMinus: calculation.value !== 0 ? calculation.value : calculation.answer,
      });
    }
  }

  function onMPlusClicked() {
    if (calculation.value !== 0 || calculation.answer !== 0) {
      setMrcValues({
        mPlus: calculation.value !== 0 ? calculation.value : calculation.answer,
        mMinus: mrcValues.mMinus,
      });
    }
  }

  function onMRCClicked() {
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
  }

  function onSubmitClicked() {
    if (calculation.modifier && calculation.value) {
      // Maybe come back and add exception for divide by zero error
      setCalculation({
        ...calculation,
        modifier: ModifierTypes.NONE,
        value: 0,
        answer: helpers.performCalculation(calculation.answer, calculation.value, calculation.modifier),
      });
    }
  }

  function onClearClicked() {
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
      answer: 0,
    });
  }

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
            className="calculator__button-modifier"
            onClick={() => onSpecialModifierClicked(ModifierTypes.plusminus)}
          >
            +/-
          </button>
          <button className="calculator__button-modifier" onClick={() => onSpecialModifierClicked(ModifierTypes.sqrt)}>
            &#8730;
          </button>
          <button
            className="calculator__button-modifier"
            onClick={() => onSpecialModifierClicked(ModifierTypes.percent)}
          >
            %
          </button>

          <button className="calculator__button-modifier" onClick={onMRCClicked}>
            MRC
          </button>
          <button className="calculator__button-modifier" onClick={onMMinusClicked}>
            M-
          </button>
          <button className="calculator__button-modifier" onClick={onMPlusClicked}>
            M+
          </button>

          <button className="calculator__button-number" onClick={onNumberClicked}>
            7
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            8
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            9
          </button>

          <button className="calculator__button-number" onClick={onNumberClicked}>
            4
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            5
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            6
          </button>

          <button className="calculator__button-number" onClick={onNumberClicked}>
            1
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            2
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            3
          </button>

          <button className="calculator__button-modifier" onClick={onClearClicked}>
            ON/C
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            0
          </button>
          <button className="calculator__button-number" onClick={onNumberClicked}>
            .
          </button>
        </div>

        <div className="calculator__buttons-grid--right">
          <button className="calculator__button-modifier" onClick={() => onModifierClicked(ModifierTypes.divide)}>
            &#247;
          </button>
          <button className="calculator__button-modifier" onClick={() => onModifierClicked(ModifierTypes.multiply)}>
            x
          </button>
          <button className="calculator__button-modifier" onClick={() => onModifierClicked(ModifierTypes.minus)}>
            -
          </button>
          <button className="calculator__button-modifier" onClick={() => onModifierClicked(ModifierTypes.plus)}>
            +
          </button>
          <button className="calculator__button-submit" onClick={onSubmitClicked}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};
