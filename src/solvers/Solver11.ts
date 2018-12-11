import BaseSolver from './BaseSolver';

export default class Solver11 extends BaseSolver<number> {
  protected filePath: string = '11.txt';

  private GRID_SIZE = 300;

  protected solvePart1(input: number): string {
    const { grid, summedGrid } = this.createGrid(input);
    let maxPower = -Infinity;
    let maxPowerCoords = { y: 0, x: 0 };
    const SQUARE_SIZE = 3;
    for (let y = 1; y <= this.GRID_SIZE - SQUARE_SIZE + 1; y++) {
      for (let x = 1; x < this.GRID_SIZE - SQUARE_SIZE + 1; x++) {
        const power = this.calculatePower(grid, summedGrid, y, x, y + SQUARE_SIZE - 1, x + SQUARE_SIZE - 1);
        if (power > maxPower) {
          maxPower = power;
          maxPowerCoords = { y, x };
        }
      }
    }

    return `${maxPowerCoords.x},${maxPowerCoords.y}`;
  }

  protected solvePart2(input: number): string {
    const { grid, summedGrid } = this.createGrid(input);
    let maxPower = -Infinity;
    let maxPowerCoords = { y: 0, x: 0, size: 0 };
    for (let size = 1; size <= this.GRID_SIZE; size++) {
      for (let y = 1; y <= this.GRID_SIZE - size + 1; y++) {
        for (let x = 1; x < this.GRID_SIZE - size + 1; x++) {
          const power = this.calculatePower(grid, summedGrid, y, x, y + size - 1, x + size - 1);
          if (power > maxPower) {
            maxPower = power;
            maxPowerCoords = { y, x, size };
          }
        }
      }
    }

    return `${maxPowerCoords.x},${maxPowerCoords.y},${maxPowerCoords.size}`;
  }

  protected parseInput(textInput: string): number {
    return parseInt(textInput, 10);
  }

  private createGrid(serialNumber: number): { grid: number[][]; summedGrid: number[][] } {
    const grid: number[][] = new Array<number[]>(this.GRID_SIZE + 1);
    const summedGrid: number[][] = new Array<number[]>(this.GRID_SIZE + 1);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array<number>(this.GRID_SIZE + 1).fill(0);
      summedGrid[i] = new Array<number>(this.GRID_SIZE + 1).fill(0);
    }

    for (let y = 1; y <= this.GRID_SIZE; y++) {
      for (let x = 1; x <= this.GRID_SIZE; x++) {
        const rackId = x + 10;
        let fuel = rackId * y;
        fuel += serialNumber;
        fuel *= rackId;
        fuel = Math.floor(fuel / 100) % 10;
        fuel -= 5;
        grid[y][x] = fuel;
      }
    }

    for (let y = 1; y <= this.GRID_SIZE; y++) {
      for (let x = 1; x <= this.GRID_SIZE; x++) {
        summedGrid[y][x] = grid[y][x] + summedGrid[y - 1][x] + summedGrid[y][x - 1] - summedGrid[y - 1][x - 1];
      }
    }

    return { grid, summedGrid };
  }

  private calculatePower(
    grid: number[][],
    summedGrid: number[][],
    top: number,
    left: number,
    bottom: number,
    right: number
  ): number {
    return (
      summedGrid[bottom][right] -
      summedGrid[bottom][left - 1] -
      summedGrid[top - 1][right] +
      summedGrid[top - 1][left - 1]
    );
  }
}
