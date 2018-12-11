import BaseSolver from './BaseSolver';

export default class Solver11 extends BaseSolver<number> {
  protected filePath: string = '11.txt';

  private GRID_SIZE = 300;

  protected solvePart1(input: number): string {
    const grid = this.createGrid(input);
    let maxPower = -Infinity;
    let maxPowerCoords = { y: 0, x: 0 };
    const SQUARE_SIZE = 3;
    for (let y = 1; y <= this.GRID_SIZE - SQUARE_SIZE + 1; y++) {
      for (let x = 1; x < this.GRID_SIZE - SQUARE_SIZE + 1; x++) {
        const power = this.calculatePower(grid, y, x, SQUARE_SIZE);
        if (power > maxPower) {
          maxPower = power;
          maxPowerCoords = { y, x };
        }
      }
    }

    return `${maxPowerCoords.x},${maxPowerCoords.y}`;
  }

  protected solvePart2(input: number): string {
    const grid = this.createGrid(input);
    let maxPower = -Infinity;
    let maxPowerCoords = { y: 0, x: 0, size: 0 };
    for (let size = 1; size <= this.GRID_SIZE; size++) {
      for (let y = 1; y <= this.GRID_SIZE - size + 1; y++) {
        for (let x = 1; x < this.GRID_SIZE - size + 1; x++) {
          const power = this.calculatePower(grid, y, x, size);
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

  private createGrid(serialNumber: number): number[][] {
    const grid: number[][] = new Array<number[]>(this.GRID_SIZE + 1);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array<number>(this.GRID_SIZE + 1);
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

    return grid;
  }

  private calculatePower(grid: number[][], top: number, left: number, squareSize: number): number {
    let result = 0;
    for (let y = 0; y < squareSize; y++) {
      for (let x = 0; x < squareSize; x++) {
        result += grid[top + y][left + x];
      }
    }

    return result;
  }
}
