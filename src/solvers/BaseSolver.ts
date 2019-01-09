import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import PuzzleVariant from '../PuzzleVariant';
import ISolver from './ISolver';

abstract class BaseSolver<TIn, TOut1 = number, TOut2 = TOut1> implements ISolver {
  protected abstract filePath: string;

  constructor(private variant: PuzzleVariant) {}

  public async solve(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      readFile(resolvePath(__dirname, '../../inputs', this.filePath), null, (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          try {
            const parsedInput = this.parseInput(data.toString());
            const result =
              this.variant === PuzzleVariant.PART_1 ? this.solvePart1(parsedInput) : this.solvePart2(parsedInput);
            resolve(result.toString());
          } catch (error) {
            reject(error.message);
          }
        }
      });
    });
  }

  protected abstract solvePart1(input: TIn): TOut1;
  protected abstract solvePart2(input: TIn): TOut2;

  protected abstract parseInput(textInput: string): TIn;
}

export default BaseSolver;
