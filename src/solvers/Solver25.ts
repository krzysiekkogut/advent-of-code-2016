import { EOL } from 'os';
import Copy from './assembunny/Copy';
import Decrease from './assembunny/Decrease';
import Increase from './assembunny/Increase';
import JumpNonZero from './assembunny/JumpNonZero';
import Operation from './assembunny/Operation';
import Out from './assembunny/Out';
import Toggle from './assembunny/Toggle';
import BaseSolver from './BaseSolver';

export default class Solver25 extends BaseSolver<Operation[], number, string> {
  protected filePath = '25.txt';

  protected solvePart1(operations: Operation[]): number {
    let a = -1;
    let message = '';
    while (!message || (message.indexOf('00') >= 0 || message.indexOf('11') >= 0)) {
      a++;
      message = this.runProgram(a, operations);
    }

    return a;
  }

  protected solvePart2(_: Operation[]): string {
    return 'Day 25 has no second part.';
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
            return new Toggle(lineSplit[1]);
          case 'out':
          default:
            return new Out(lineSplit[1]);
        }
      });
  }

  private runProgram(a: number, operations: Operation[]): string {
    let i = 0;
    let msg = '';
    const registers = [a, 0, 0, 0];
    while (
      i >= 0 &&
      i < operations.length &&
      (msg.length < 2 || msg[msg.length - 1] !== msg[msg.length - 2]) &&
      msg.length < 50
    ) {
      const result = operations[i].calc(registers, operations, i);
      i += result.instructionPointerMove;
      msg += result.message;
    }

    return msg;
  }
}
