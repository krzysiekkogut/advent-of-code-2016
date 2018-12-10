import BaseSolver from './BaseSolver';

interface ICoords {
  x: number;
  y: number;
}

interface IPoint {
  position: ICoords;
  velocity: ICoords;
}

export default class Solver10 extends BaseSolver<IPoint[]> {
  protected filePath: string = '10.txt';

  protected solvePart1(input: IPoint[]): string {
    throw new Error('Method not implemented.');
  }
  protected solvePart2(input: IPoint[]): string {
    throw new Error('Method not implemented.');
  }
  protected parseInput(textInput: string): IPoint[] {
    throw new Error('Method not implemented.');
  }
}
