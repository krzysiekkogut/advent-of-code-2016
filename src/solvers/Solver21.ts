import { EOL } from 'os';
import MovePositionInstruction from './21/MovePositionInstruction';
import ReversePositionsInstruction from './21/ReversePositionsInstruction';
import RotateBasedOnLetterPositionInstruction from './21/RotateBasedOnLetterPositionInstruction';
import RotateLeftInstruction from './21/RotateLeftInstruction';
import RotateRightInstruction from './21/RotateRightInstruction';
import ScrambleInstruction from './21/ScrambleInstruction';
import SwapLetterInstruction from './21/SwapLetterInstruction';
import SwapPositionInstruction from './21/SwapPositionInstruction';
import BaseSolver from './BaseSolver';

export default class Solver21 extends BaseSolver<ScrambleInstruction[], string> {
  protected filePath = '21.txt';

  protected solvePart1(instructions: ScrambleInstruction[]): string {
    let password = 'abcdefgh'.split('');
    for (const instruction of instructions) {
      password = instruction.scramble(password);
    }
    return password.join('');
  }

  protected solvePart2(instructions: ScrambleInstruction[]): string {
    let password = 'fbgdceah'.split('');
    for (const instruction of instructions.reverse()) {
      password = instruction.unscramble(password);
    }
    return password.join('');
  }

  protected parseInput(textInput: string): ScrambleInstruction[] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => {
        if (line.startsWith('swap position')) return new SwapPositionInstruction(line);
        if (line.startsWith('swap letter')) return new SwapLetterInstruction(line);
        if (line.startsWith('rotate left')) return new RotateLeftInstruction(line);
        if (line.startsWith('rotate right')) return new RotateRightInstruction(line);
        if (line.startsWith('rotate based')) return new RotateBasedOnLetterPositionInstruction(line);
        if (line.startsWith('reverse positions')) return new ReversePositionsInstruction(line);
        if (line.startsWith('move position')) return new MovePositionInstruction(line);

        throw new Error('Incorrect data');
      });
  }
}
