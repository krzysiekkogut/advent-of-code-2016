import Operation from './Operation';

export default class Increase extends Operation {
  constructor(private register: string) {
    super();
  }

  public calc(registers: number[]): number {
    registers[this.getRegisterNumber(this.register)]++;
    return 1;
  }
}
