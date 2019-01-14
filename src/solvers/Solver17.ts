import { createHash } from 'crypto';
import BaseSolver from './BaseSolver';

interface INode {
  path: string;
  row: number;
  col: number;
}

export default class Solver17 extends BaseSolver<string, string, number> {
  protected filePath = '17.txt';

  protected solvePart1(passcode: string): string {
    const queue: INode[] = [{ path: '', row: 1, col: 1 }];
    while (queue.length > 0) {
      const current = queue.shift()!;
      const { row, col, path } = current;
      if (row === 4 && col === 4) {
        return path;
      }

      queue.push(...this.getNextSteps(current, passcode));
    }

    throw new Error('Could not find path');
  }

  protected solvePart2(passcode: string): number {
    const paths: string[] = [];
    const queue: INode[] = [{ path: '', row: 1, col: 1 }];
    while (queue.length > 0) {
      const current = queue.shift()!;
      const { row, col, path } = current;
      if (row === 4 && col === 4) {
        paths.push(path);
      } else {
        queue.push(...this.getNextSteps(current, passcode));
      }
    }

    return paths.sort((pathA, pathB) => pathB.length - pathA.length)[0].length;
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }

  private getNextSteps({ row, col, path }: INode, passcode: string): INode[] {
    const next: INode[] = [];
    const [up, down, left, right] = createHash('md5')
      .update(`${passcode}${path}`)
      .digest('hex')
      .slice(0, 4)
      .split('')
      .map(h => h.charCodeAt(0) >= 'b'.charCodeAt(0));

    if (up && row > 1) {
      next.push({ row: row - 1, col, path: `${path}U` });
    }

    if (down && row < 4) {
      next.push({ row: row + 1, col, path: `${path}D` });
    }

    if (left && col > 1) {
      next.push({ row, col: col - 1, path: `${path}L` });
    }

    if (right && col < 4) {
      next.push({ row, col: col + 1, path: `${path}R` });
    }

    return next;
  }
}
