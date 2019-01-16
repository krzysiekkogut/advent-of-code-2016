import Operation, { IOperationResult } from './Operation';

export default class Out extends Operation {
  public static id = 'out';
  public id = 'out';

  public args: string[];

  constructor(private register: string) {
    super();
    this.args = [register];
  }

  public calc(registers: number[], _ops: Operation[], _ip: number): IOperationResult {
    return {
      instructionPointerMove: 1,
      message: registers[this.getRegisterNumber(this.register)].toString(),
    };
  }
}
