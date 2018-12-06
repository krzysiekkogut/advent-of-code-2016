import BaseSolver from './BaseSolver';

interface IPoint {
  id: number;
  x: number;
  y: number;
}

export default class Solver7 extends BaseSolver<IPoint> {
  protected filePath: string = '6.txt';
  protected solvePart1(input: IPoint): string {
    throw new Error('Method not implemented.');
  }
  protected solvePart2(input: IPoint): string {
    throw new Error('Method not implemented.');
  }
  protected parseInput(textInput: string): IPoint {
    throw new Error('Method not implemented.');
  }
}
