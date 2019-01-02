import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface ISpaceTimePoint {
  x: number;
  y: number;
  z: number;
  t: number;
}

export default class Solver25 extends BaseSolver<ISpaceTimePoint[]> {
  protected filePath = '25.txt';

  protected solvePart1(input: ISpaceTimePoint[]): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2(input: ISpaceTimePoint[]): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): ISpaceTimePoint[] {
    return textInput
      .split(EOL)
      .map(l => l.trim())
      .filter(line => !!line)
      .map(line => {
        const coords = line.split(',');
        return {
          x: parseInt(coords[0], 10),
          y: parseInt(coords[1], 10),
          z: parseInt(coords[2], 10),
          // tslint:disable-next-line:object-literal-sort-keys
          t: parseInt(coords[4], 10),
        } as ISpaceTimePoint;
      });
  }
}
