export enum ModifierTypes {
  NONE,
  plus,
  minus,
  multiply,
  divide,
  sqrt,
  percent,
  plusminus,
}

export class CalculationState {
  public modifier: ModifierTypes;
  public value: number;
  public answer: number;

  constructor(modifier: ModifierTypes, value: number, answer: number) {
    this.modifier = modifier;
    this.value = value;
    this.answer = answer;
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
