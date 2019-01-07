// tslint:disable:no-bitwise
import BaseSolver from './BaseSolver';

export default class Solver21 extends BaseSolver<null> {
  protected filePath = '21.txt';

  protected solvePart1(): string {
    return this.findSolution().toString();
  }

  protected solvePart2(): string {
    return this.findSolution(true).toString();
  }

  protected parseInput(): null {
    return null;
  }

  private findSolution(max = false): number {
    const results = new Set<number>();
    let last = -1;

    let a = 0;
    let b = 0;
    let c = 0;

    while (true) {
      b = c | 65536;
      c = 7637914;
      while (true) {
        a = b & 255;
        c += a;
        c &= 16777215;
        c *= 65899;
        c &= 16777215;

        if (256 > b) {
          if (!max) {
            return c;
          }

          if (results.has(c)) {
            return last;
          }

          results.add(c);
          last = c;
          break;
        }

        b = Math.floor(b / 256);
      }
    }
  }
}
