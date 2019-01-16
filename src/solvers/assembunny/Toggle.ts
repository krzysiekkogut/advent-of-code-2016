import Copy from './Copy';
import Decrease from './Decrease';
import Increase from './Increase';
import JumpNonZero from './JumpNonZero';
import Operation, { IOperationResult } from './Operation';

export default class Toggle extends Operation {
  public static id = 'tgl';
  public id = 'tgl';
  public args: string[];

  constructor(private offset: string) {
    super();
    this.args = [offset];
  }

  public calc(registers: number[], operations: Operation[], currentInstructionPointer: number): IOperationResult {
    const offsetNumber = parseInt(this.offset);
    const offset = isNaN(offsetNumber) ? registers[this.getRegisterNumber(this.offset)] : offsetNumber;

    const targetInstructionPointer = currentInstructionPointer + offset;
    if (targetInstructionPointer >= 0 && targetInstructionPointer < operations.length) {
      switch (operations[targetInstructionPointer].id) {
        case Increase.id:
          operations[targetInstructionPointer] = new Decrease(operations[targetInstructionPointer].args[0]);
          break;
        case Decrease.id:
        case Toggle.id:
          operations[targetInstructionPointer] = new Increase(operations[targetInstructionPointer].args[0]);
          break;
        case JumpNonZero.id:
          operations[targetInstructionPointer] = new Copy(
            operations[targetInstructionPointer].args[0],
            operations[targetInstructionPointer].args[1]
          );
          break;
        case Copy.id:
          operations[targetInstructionPointer] = new JumpNonZero(
            operations[targetInstructionPointer].args[0],
            operations[targetInstructionPointer].args[1]
          );
          break;
      }
    }

    return { instructionPointerMove: 1, message: '' };
  }
}
