import { EOL } from 'os';
import Copy from './12/Copy';
import Decrease from './12/Decrease';
import Increase from './12/Increase';
import JumpNonZero from './12/JumpNonZero';
import Operation from './12/Operation';
import BaseSolver from './BaseSolver';

export default class Solver12 extends BaseSolver<Operation[]> {
  protected filePath = '12.txt';

  protected solvePart1(_: Operation[]): number {
    const registers = [0, 0, 0, 0];
    return this.runProgram(registers);
  }

  protected solvePart2(_: Operation[]): number {
    const registers = [0, 0, 1, 0];
    return this.runProgram(registers);
  }

  protected parseInput(textInput: string): Operation[] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(l => l.split(' '))
      .map(lineSplit => {
        switch (lineSplit[0]) {
          case 'cpy':
            return new Copy(lineSplit[1], lineSplit[2]);
          case 'inc':
            return new Increase(lineSplit[1]);
          case 'dec':
            return new Decrease(lineSplit[1]);
          case 'jnz':
          default:
            return new JumpNonZero(lineSplit[1], parseInt(lineSplit[2]));
        }
      });
  }

  private runProgram(registers: number[]): number {
    let [a, b, c, d] = registers;
    a = 1;
    b = 1;
    d = c !== 0 ? 33 : 26;

    for (let i = 0; i < d; i++) {
      c = a;
      a += b;
      b = c;
    }

    return a + 182;
  }
}
