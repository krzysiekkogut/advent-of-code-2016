import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver1 extends BaseSolver<number[]> {
  protected filePath: string = '1.txt';

  protected solvePart1(input: number[]): string {
    return input.reduce((prev, curr) => prev + curr, 0).toString();
  }

  protected solvePart2(input: number[]): string {
    let i = 0;
    let currentFreq = 0;
    const frequencies = new Map<number, boolean>([[currentFreq, true]]);
    while (true) {
      currentFreq += input[i];
      if (frequencies.get(currentFreq)) {
        return currentFreq.toString();
      }

      frequencies.set(currentFreq, true);
      i = (i + 1) % input.length;
    }
  }

  protected parseInput(textInput: string): number[] {
    return textInput.split(EOL).map(x => parseInt(x, 10));
  }
}
