import Instruction from './Instruction';

export default class RotateCol extends Instruction {
  public static id = 'rotate column';

  public col: number;
  public move: number;

  constructor(operationDescription: string) {
    super();
    const [x, _, move] = operationDescription.split(' ').slice(2);
    this.col = parseInt(x.split('=')[1].trim());
    this.move = parseInt(move.trim());
  }

  public process(display: string[][]): void {
    const temp: string[] = [];
    for (let row = display.length - this.move; row < display.length; row++) {
      temp.push(display[row][this.col]);
    }

    for (let row = display.length - 1; row >= this.move; row--) {
      display[row][this.col] = display[row - this.move][this.col];
    }

    for (let row = 0; row < temp.length; row++) {
      display[row][this.col] = temp[row];
    }
  }
}
