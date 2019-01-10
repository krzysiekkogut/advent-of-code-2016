import Instruction from './Instruction';

export default class RotateRow extends Instruction {
  public static id = 'rotate row';

  public row: number;
  public move: number;

  constructor(operationDescription: string) {
    super();
    const [y, _, move] = operationDescription.split(' ').slice(2);
    this.row = parseInt(y.split('=')[1].trim());
    this.move = parseInt(move.trim());
  }

  public process(display: string[][]): void {
    for (let i = 0; i < this.move; i++) {
      display[this.row].unshift(display[this.row].pop()!);
    }
  }
}
