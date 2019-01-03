import Operation from './Operation';

export default class Gtir extends Operation {
  public calc(registers: number[], inputA: number, inputB: number, output: number): number[] {
    const result = registers.slice();
    result[output] = inputA > registers[inputB] ? 1 : 0;
    return result;
  }
}
