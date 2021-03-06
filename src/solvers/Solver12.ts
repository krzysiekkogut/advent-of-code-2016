import { EOL } from 'os';
import Copy from './assembunny/Copy';
import Decrease from './assembunny/Decrease';
import Increase from './assembunny/Increase';
import JumpNonZero from './assembunny/JumpNonZero';
import Operation from './assembunny/Operation';
import BaseSolver from './BaseSolver';

export default class Solver12 extends BaseSolver<Operation[]> {
  protected filePath = '12.txt';

  protected solvePart1(_: Operation[]): number {
    return this.runProgram(0);
  }

  protected solvePart2(_: Operation[]): number {
    return this.runProgram(1);
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
            return new JumpNonZero(lineSplit[1], lineSplit[2]);
        }
      });
  }

  private runProgram(c: number): number {
    let a = 1;
    let b = 1;
    const d = c !== 0 ? 33 : 26;

    for (let i = 0; i < d; i++) {
      c = a;
      a += b;
      b = c;
    }

    return a + 182;
  }
}
