export default abstract class Operation {
  public abstract calc(registers: number[], inputA: number, inputB: number, output: number): number[];
}
