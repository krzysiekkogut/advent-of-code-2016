export default abstract class Operation {
  public abstract calc(registers: number[]): number;

  protected getRegisterNumber(registerName: string): number {
    return registerName.charCodeAt(0) - 'a'.charCodeAt(0);
  }
}
