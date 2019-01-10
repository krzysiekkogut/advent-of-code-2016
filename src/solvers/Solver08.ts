import { EOL } from 'os';
import Instruction from './08/Instruction';
import Rect from './08/Rect';
import RotateCol from './08/RotateCol';
import RotateRow from './08/RotateRow';
import BaseSolver from './BaseSolver';

export default class Solver08 extends BaseSolver<Instruction[], number, string> {
  protected filePath = '8.txt';

  protected solvePart1(instructions: Instruction[]): number {
    const display = this.displayInstructions(instructions);
    return display.reduce((prev, curr) => prev.concat(curr), []).filter(pixel => pixel !== ' ').length;
  }

  protected solvePart2(instructions: Instruction[]): string {
    // tslint:disable-next-line:no-console
    console.log(
      this.displayInstructions(instructions)
        .map(row => row.join(''))
        .join(EOL) + EOL
    );
    return 'Read answer from console messages above';
  }

  protected parseInput(textInput: string): Instruction[] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => {
        if (line.startsWith(Rect.id)) {
          return new Rect(line);
        }

        if (line.startsWith(RotateRow.id)) {
          return new RotateRow(line);
        }

        return new RotateCol(line);
      });
  }

  private displayInstructions(instructions: Instruction[]): string[][] {
    const display: string[][] = new Array(6);
    for (let i = 0; i < display.length; i++) {
      display[i] = new Array(50).fill(' ');
    }

    instructions.forEach(instruction => instruction.process(display));
    return display;
  }
}
