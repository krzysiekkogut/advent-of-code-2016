import Operation from './Operation';

export default class Banr extends Operation {
  public calc(registers: number[], inputA: number, inputB: number, output: number): number[] {
    const result = registers.slice();
    // tslint:disable-next-line:no-bitwise
    result[output] = registers[inputA] & registers[inputB];
    return result;
  }
}
