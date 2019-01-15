import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IGridState {
  gridData: Grid;
  steps: number;
}

interface IDisk {
  isGoal: boolean;
  size: number;
  used: number;
  available: number;
}

interface ICoord {
  x: number;
  y: number;
}

type Grid = IDisk[][];

export default class Solver22 extends BaseSolver<Grid> {
  protected filePath = '22.txt';

  protected solvePart1(grid: Grid): number {
    const nodes = grid.reduce((prev, curr) => prev.concat(curr), []);
    let viablePairsCount = 0;
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        if (this.canMove(nodes[a], nodes[b]) || this.canMove(nodes[b], nodes[a])) {
          viablePairsCount++;
        }
      }
    }

    return viablePairsCount;
  }

  protected solvePart2(grid: Grid): number {
    const maze = new Array<boolean[]>(grid.length);
    const visited = new Array<boolean[]>(grid.length);
    const emptyNode = { x: -1, y: -1 };
    for (let x = 0; x < grid.length; x++) {
      visited[x] = new Array<boolean>(grid[x].length).fill(false);
      maze[x] = new Array<boolean>(grid[x].length).fill(true);
      for (let y = 0; y < grid[x].length; y++) {
        if (grid[x][y].used > 100) {
          maze[x][y] = false;
        }

        if (grid[x][y].used === 0) {
          emptyNode.x = x;
          emptyNode.y = y;
        }
      }
    }

    let totalSteps = 0;
    const queue = [{ ...emptyNode, steps: 0 }];
    while (queue.length > 0) {
      const { x, y, steps } = queue.shift()!;
      if (y === 0 && x === grid.length - 2) {
        totalSteps += steps;
        break;
      }

      if (!visited[x][y]) {
        visited[x][y] = true;
        if (maze[x][y + 1]) {
          queue.push({ x, y: y + 1, steps: steps + 1 });
        }

        if (maze[x][y - 1]) {
          queue.push({ x, y: y - 1, steps: steps + 1 });
        }

        if (maze[x + 1] && maze[x + 1][y]) {
          queue.push({ x: x + 1, y, steps: steps + 1 });
        }

        if (maze[x - 1] && maze[x - 1][y]) {
          queue.push({ x: x - 1, y, steps: steps + 1 });
        }
      }
    }

    return totalSteps + (grid.length - 2) * 5 + 1;
  }

  protected parseInput(textInput: string): Grid {
    const lines = textInput
      .split(EOL)
      .slice(2)
      .filter(l => !!l);

    const grid = new Array<IDisk[]>();

    for (const line of lines) {
      const [x, y, size, used, available] = line
        .match(/x(\d+)-y(\d+)\s*(\d+)T\s*(\d+)T\s*(\d+)T/)!
        .slice(1)
        .map(n => parseInt(n));
      if (!grid[x]) grid[x] = new Array<IDisk>();
      grid[x][y] = { isGoal: false, size, used, available };
    }
    grid[grid.length - 1][0].isGoal = true;

    return grid;
  }

  private canMove(fromDisk: IDisk, toDisk: IDisk) {
    return fromDisk.used !== 0 && toDisk.available >= fromDisk.used;
  }
}
