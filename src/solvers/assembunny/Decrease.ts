import Operation, { IOperationResult } from './Operation';

export default class Decrease extends Operation {
  public static id = 'dec';
  public id = 'dec';
  public args: string[];

  constructor(private register: string) {
    super();
    this.args = [register];
  }

  public calc(registers: number[]): IOperationResult {
    if (isNaN(parseInt(this.register))) {
      registers[this.getRegisterNumber(this.register)]--;
    }
    return { instructionPointerMove: 1, message: '' };
  }
}
