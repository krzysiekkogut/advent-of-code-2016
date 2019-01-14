import Operation from './Operation';

export default class JumpNonZero extends Operation {
  constructor(private testValue: string, private instructionPointer: number) {
    super();
  }

  public calc(registers: number[]): number {
    const testValueNumber = parseInt(this.testValue);
    const testValue = isNaN(testValueNumber) ? registers[this.getRegisterNumber(this.testValue)] : testValueNumber;
    return testValue !== 0 ? this.instructionPointer : 1;
  }
}
