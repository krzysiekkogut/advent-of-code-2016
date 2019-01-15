import Operation from './Operation';

export default class JumpNonZero extends Operation {
  public static id = 'jnz';
  public id = 'jnz';
  public args: string[];

  constructor(private testValue: string, private instructionPointer: string) {
    super();
    this.args = [testValue, instructionPointer];
  }

  public calc(registers: number[]): number {
    const testValueNumber = parseInt(this.testValue);
    const testValue = isNaN(testValueNumber) ? registers[this.getRegisterNumber(this.testValue)] : testValueNumber;

    const instructionPointerNumber = parseInt(this.instructionPointer);
    const instructionPointer = isNaN(instructionPointerNumber)
      ? registers[this.getRegisterNumber(this.instructionPointer)]
      : instructionPointerNumber;

    return testValue !== 0 ? instructionPointer : 1;
  }
}
