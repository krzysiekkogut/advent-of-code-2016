import BaseSolver from './BaseSolver';

const SAFE = '.';
const TRAP = '^';

export default class Solver18 extends BaseSolver<string> {
  protected filePath = '18.txt';

  protected solvePart1(input: string): number {
    return this.countSafeTiles(input, 40);
  }

  protected solvePart2(input: string): number {
    return this.countSafeTiles(input, 400000);
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }

  private countSafeTiles(firstRow: string, rowsCount: number): number {
    let prevRow = firstRow.split('');
    let safeCount = prevRow.filter(t => t === SAFE).length;

    for (let row = 1; row < rowsCount; row++) {
      const nextRow: string[] = [];
      for (let i = 0; i < prevRow.length; i++) {
        const left = prevRow[i - 1] || SAFE;
        const center = prevRow[i] || SAFE;
        const right = prevRow[i + 1] || SAFE;

        if (
          (left === TRAP && center === TRAP && right === SAFE) ||
          (left === SAFE && center === TRAP && right === TRAP) ||
          (left === TRAP && center === SAFE && right === SAFE) ||
          (left === SAFE && center === SAFE && right === TRAP)
        ) {
          nextRow.push(TRAP);
        } else {
          safeCount++;
          nextRow.push(SAFE);
        }
      }

      prevRow = nextRow;
    }

    return safeCount;
  }
}
