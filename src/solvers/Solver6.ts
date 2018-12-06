import BaseSolver from './BaseSolver';

interface IPoint {
  id: number;
  x: number;
  y: number;
}

export default class Solver7 extends BaseSolver<IPoint[]> {
  protected filePath: string = '6.txt';

  protected solvePart1(input: IPoint[]): string {
    const ROWS = Math.max(...input.map(p => p.y)) + 1;
    const COLS = Math.max(...input.map(p => p.x)) + 1;

    const grid = new Array<Array<{ closestPointId: number; distance: number }>>(ROWS);
    for (let i = 0; i < ROWS; i++) {
      grid[i] = new Array(COLS);
    }

    input.forEach(({ id, x, y }) => {
      grid[y][x] = { closestPointId: id, distance: 0 };
    });

    input.forEach(({ id, y, x }) => {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          if (r === y && c === x) continue;
          const distance = Math.abs(x - c) + Math.abs(y - r);
          if (!grid[r][c] || grid[r][c].distance > distance) {
            grid[r][c] = { closestPointId: id, distance };
          } else if (grid[r][c].distance === distance) {
            grid[r][c] = { closestPointId: -1, distance };
          }
        }
      }
    });

    const cover = new Map<number, number>();
    for (const gridRow of grid) {
      for (const gridCell of gridRow) {
        if (gridCell.closestPointId !== -1) {
          const currentPointCover = cover.get(gridCell.closestPointId) || 0;
          cover.set(gridCell.closestPointId, currentPointCover + 1);
        }
      }
    }

    const infinityMap = new Map<number, boolean>();
    for (let i = 0; i < ROWS; i++) {
      infinityMap.set(grid[i][0].closestPointId, true);
      infinityMap.set(grid[i][COLS - 1].closestPointId, true);
    }

    for (let i = 0; i < COLS; i++) {
      infinityMap.set(grid[0][i].closestPointId, true);
      infinityMap.set(grid[ROWS - 1][i].closestPointId, true);
    }

    infinityMap.forEach((val, key) => {
      if (val) {
        cover.delete(key);
      }
    });

    return Math.max(...Array.from(cover.values())).toString();
  }

  protected solvePart2(input: IPoint[]): string {
    const ROWS = Math.max(...input.map(p => p.y)) + 1;
    const COLS = Math.max(...input.map(p => p.x)) + 1;
    const grid = new Array<number[]>(ROWS);
    for (let i = 0; i < ROWS; i++) {
      grid[i] = new Array(COLS).fill(0);
    }

    let counter = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        input.forEach(({ x, y }) => {
          const distance = Math.abs(x - c) + Math.abs(y - r);
          grid[r][c] += distance;
        });
        if (grid[r][c] < 10000) {
          counter++;
        }
      }
    }

    return counter.toString();
  }

  protected parseInput(textInput: string): IPoint[] {
    return textInput.split('\n').map((coords, index) => ({
      id: index,
      x: parseInt(coords.split(',')[0].trim(), 10),
      y: parseInt(coords.split(',')[1].trim(), 10),
    }));
  }
}
