import Operation from './Operation';

export default class Addi extends Operation {
  public calc(registers: number[], inputA: number, inputB: number, output: number): number[] {
    const result = registers.slice();
    result[output] = registers[inputA] + inputB;
    return result;
  }
}
