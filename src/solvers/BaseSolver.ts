import { readFile } from 'fs';
import { resolve as resolvePath } from 'path';

import ISolver from './ISolver';

abstract class BaseSolver<T> implements ISolver {
  abstract filePath: string;

  async solve(): Promise<string> {
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

  abstract solveInternal(input: T): string;

  abstract parseInput(textInput: string): T;
}

export default BaseSolver;
