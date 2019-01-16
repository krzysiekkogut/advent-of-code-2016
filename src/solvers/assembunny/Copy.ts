import Operation, { IOperationResult } from './Operation';

export default class Copy extends Operation {
  public static id = 'copy';
  public id = 'copy';
  public args: string[];

  constructor(private from: string, private to: string) {
    super();
    this.args = [from, to];
  }

  public calc(registers: number[]): IOperationResult {
    if (isNaN(parseInt(this.to))) {
      const fromValue = parseInt(this.from);
      registers[this.getRegisterNumber(this.to)] = isNaN(fromValue)
        ? registers[this.getRegisterNumber(this.from)]
        : fromValue;
    }
    return { instructionPointerMove: 1, message: '' };
  }
}
