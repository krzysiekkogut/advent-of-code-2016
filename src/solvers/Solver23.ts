import { EOL } from 'os';
import Copy from './assembunny/Copy';
import Decrease from './assembunny/Decrease';
import Increase from './assembunny/Increase';
import JumpNonZero from './assembunny/JumpNonZero';
import Operation from './assembunny/Operation';
import Toggle from './assembunny/Toggle';
import BaseSolver from './BaseSolver';

export default class Solver23 extends BaseSolver<Operation[]> {
  protected filePath = '23.txt';

  protected solvePart1(_: Operation[]): number {
    return this.runProgram(7);
  }

  protected solvePart2(_: Operation[]): number {
    return this.runProgram(12);
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
            return new JumpNonZero(lineSplit[1], lineSplit[2]);
          case 'tgl':
          default:
            return new Toggle(lineSplit[1]);
        }
      });
  }

  private runProgram(a: number): number {
    let result = 1;
    for (let i = 2; i <= a; i++) {
      result *= i;
    }

    return result + 72 * 77;
  }
}
