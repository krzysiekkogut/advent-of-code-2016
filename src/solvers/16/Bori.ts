import Operation from './Operation';

export default class Bori extends Operation {
  public calc(registers: number[], inputA: number, inputB: number, output: number): number[] {
    const result = registers.slice();
    // tslint:disable-next-line:no-bitwise
    result[output] = registers[inputA] | inputB;
    return result;
  }
}
