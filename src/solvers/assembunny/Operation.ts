export interface IOperationResult {
  instructionPointerMove: number;
  message: string;
}

export default abstract class Operation {
  public abstract id: string;
  public abstract args: string[];

  public abstract calc(
    registers: number[],
    operations: Operation[],
    currentInstructionPointer: number
  ): IOperationResult;

  protected getRegisterNumber(registerName: string): number {
    return registerName.charCodeAt(0) - 'a'.charCodeAt(0);
  }
}
