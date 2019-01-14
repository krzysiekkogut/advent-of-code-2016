import Operation from './Operation';

export default class Copy extends Operation {
  constructor(private from: string, private to: string) {
    super();
  }

  public calc(registers: number[]): number {
    const fromValue = parseInt(this.from);
    registers[this.getRegisterNumber(this.to)] = isNaN(fromValue)
      ? registers[this.getRegisterNumber(this.from)]
      : fromValue;
    return 1;
  }
}
