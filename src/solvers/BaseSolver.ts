import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import PuzzleVariant from '../PuzzleVariant';
import ISolver from './ISolver';

abstract class BaseSolver<T> implements ISolver {
  protected abstract filePath: string;

  constructor(protected variant: PuzzleVariant = PuzzleVariant.PART_1) {}

  public async solve(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      readFile(resolvePath(__dirname, '../../inputs', this.filePath), null, (err, data) => {
        if (err) {
          reject(err.message);
        } else {
          try {
            const parsedInput = this.parseInput(data.toString());
            const result = this.solveInternal(parsedInput);
            resolve(result);
          } catch (error) {
            reject(error.message);
          }
        }
      });
    });
  }

  protected abstract solveInternal(input: T): string;

  protected abstract parseInput(textInput: string): T;
}

export default BaseSolver;
