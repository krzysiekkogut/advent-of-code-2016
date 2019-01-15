import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver20 extends BaseSolver<Array<{ low: number; high: number }>> {
  protected filePath = '20.txt';

  protected solvePart1(ranges: Array<{ low: number; high: number }>): number {
    let min = 0;
    for (const { low, high } of ranges) {
      if (min >= low && min <= high) {
        min = high + 1;
      }
    }
    return min;
  }

  protected solvePart2(ranges: Array<{ low: number; high: number }>): number {
    let max = 0;
    let disallowedCount = 0;
    for (const { low, high } of ranges) {
      if (high > max) {
        if (low >= max) {
          disallowedCount += high - low + 1;
        } else {
          disallowedCount += high - max;
        }
        max = high;
      }
    }
    return 4294967295 + 1 - disallowedCount;
  }

  protected parseInput(textInput: string): Array<{ low: number; high: number }> {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => {
        const [low, high] = line.split('-').map(n => parseInt(n));
        return { low, high };
      })
      .sort((a, b) => (a.low !== b.low ? a.low - b.low : a.high - b.high));
  }
}
