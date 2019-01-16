import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IPoint {
  id: number;
  row: number;
  col: number;
}

type Maze = boolean[][];

export default class Solver24 extends BaseSolver<{ maze: Maze; points: IPoint[] }> {
  protected filePath = '24.txt';

  protected solvePart1({ maze, points }: { maze: Maze; points: IPoint[] }): number {
    return this.findShortestTotalPathLength(
      this.getAllPathLengths(maze, points),
      this.getPermutations(points.filter(p => p.id > 0).map(p => p.id)).map(p => [0].concat(p))
    );
  }

  protected solvePart2({ maze, points }: { maze: Maze; points: IPoint[] }): number {
    return this.findShortestTotalPathLength(
      this.getAllPathLengths(maze, points),
      this.getPermutations(points.filter(p => p.id > 0).map(p => p.id)).map(p => [0].concat(p).concat([0]))
    );
  }

  protected parseInput(textInput: string): { maze: Maze; points: IPoint[] } {
    const points = new Array<IPoint>();
    const lines = textInput.split(EOL).filter(l => !!l);
    const maze = lines.map((line, row) =>
      line
        .trim()
        .split('')
        .map((f, col) => {
          switch (f) {
            case '#':
              return false;
            case '.':
              return true;
            default:
              points.push({ id: parseInt(f), row, col });
              return true;
          }
        })
    );
    return { maze, points: points.sort((a, b) => a.id - b.id) };
  }

  private findShortestTotalPathLength(pathLengths: number[][], permutations: number[][]): number {
    let minPath = Infinity;
    for (const permutation of permutations) {
      let totalLength = 0;
      for (let i = 0; i < permutation.length - 1; i++) {
        totalLength += pathLengths[permutation[i]][permutation[i + 1]];
      }

      minPath = Math.min(minPath, totalLength);
    }

    return minPath;
  }

  private getAllPathLengths(maze: boolean[][], points: IPoint[]): number[][] {
    const pathLengths = new Array<number[]>(points.length);
    for (let i = 0; i < pathLengths.length; i++) {
      pathLengths[i] = new Array<number>(points.length).fill(0);
    }

    for (let a = 0; a < points.length; a++) {
      for (let b = a + 1; b < points.length; b++) {
        pathLengths[a][b] = pathLengths[b][a] = this.findShortestPathLength(maze, points[a], points[b]);
      }
    }

    return pathLengths;
  }

  private findShortestPathLength(maze: boolean[][], from: IPoint, to: IPoint): number {
    const queue = [{ row: from.row, col: from.col, distance: 0 }];
    const visited = new Array<boolean[]>(maze.length);
    for (let i = 0; i < visited.length; i++) {
      visited[i] = new Array(maze[i].length).fill(false);
    }

    while (queue.length > 0) {
      const { row, col, distance } = queue.shift()!;
      if (row === to.row && col === to.col) {
        return distance;
      }

      if (!visited[row][col]) {
        visited[row][col] = true;

        if (maze[row][col - 1]) {
          queue.push({ row, col: col - 1, distance: distance + 1 });
        }

        if (maze[row][col + 1]) {
          queue.push({ row, col: col + 1, distance: distance + 1 });
        }

        if (maze[row - 1] && maze[row - 1][col]) {
          queue.push({ row: row - 1, col, distance: distance + 1 });
        }

        if (maze[row + 1] && maze[row + 1][col]) {
          queue.push({ row: row + 1, col, distance: distance + 1 });
        }
      }
    }

    throw new Error(`Could not find path from ${from.id} to ${to.id}.`);
  }

  private getPermutations(array: number[]): number[][] {
    if (array.length <= 1) return [array];

    const results: number[][] = [];

    for (let i = 0; i < array.length; i++) {
      const current = array.slice();
      const head = current.splice(i, 1);
      const nextPermutations = this.getPermutations(current.slice());
      for (const permutation of nextPermutations) {
        results.push(head.concat(permutation));
      }
    }

    return results;
  }
}
