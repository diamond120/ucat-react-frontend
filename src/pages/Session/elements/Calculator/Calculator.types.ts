export enum ModifierTypes {
  NONE = 'NONE',
  plus = 'plus',
  minus = 'minus',
  multiply = 'multiply',
  divide = 'divide',
  sqrt = 'sqrt',
  percent = 'percent',
  plusminus = 'plusminus',
}

export class CalculationState {
  public modifier: ModifierTypes;
  public value: number;
  public displayAnswer: boolean;
  public text: string;
  public answer: number;

  constructor(modifier: ModifierTypes, value: number, text: string, answer: number) {
    this.modifier = modifier;
    this.value = value;
    this.text = text;
    this.answer = answer;
    this.displayAnswer = false;
  }
}

export class MrcState {
  public mPlus: number;
  public mMinus: number;

  constructor(mPlus: number, mMinus: number) {
    this.mPlus = mPlus;
    this.mMinus = mMinus;
  }
}
