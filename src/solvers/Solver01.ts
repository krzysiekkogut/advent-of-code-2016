import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver1 extends BaseSolver<number[]> {
  protected filePath: string = '1.txt';

  protected solvePart1(input: number[]): string {
    return input.reduce((prev, curr) => prev + curr, 0).toString();
  }

  protected solvePart2(input: number[]): string {
    const frequencies = new Map<number, boolean>();

    let currentFreq = 0;
    for (let i = 0; !frequencies.get(currentFreq); i = (i + 1) % input.length) {
      frequencies.set(currentFreq, true);
      currentFreq += input[i];
    }

    return currentFreq.toString();
  }

  protected parseInput(textInput: string): number[] {
    return textInput.split(EOL).map(x => parseInt(x, 10));
  }
}
