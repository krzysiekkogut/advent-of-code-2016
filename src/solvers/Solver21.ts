import BaseSolver from './BaseSolver';

export default class Solver21 extends BaseSolver<null> {
  protected filePath = '21.txt';

  protected solvePart1(): number {
    return this.findSolution();
  }

  protected solvePart2(): number {
    return this.findSolution(true);
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
      b = c | 65536; // tslint:disable-line:no-bitwise
      c = 7637914;
      while (true) {
        a = b & 255; // tslint:disable-line:no-bitwise
        c += a;
        c &= 16777215; // tslint:disable-line:no-bitwise
        c *= 65899;
        c &= 16777215; // tslint:disable-line:no-bitwise

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
