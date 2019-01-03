import Operation from './Operation';

export default class Seti extends Operation {
  public calc(registers: number[], inputA: number, inputB: number, output: number): number[] {
    const result = registers.slice();
    result[output] = inputA;
    return result;
  }
}
