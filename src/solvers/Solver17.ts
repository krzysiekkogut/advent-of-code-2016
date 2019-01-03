import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IRange {
  isRow: boolean;
  primaryCoord: number;
  secondaryCoordStart: number;
  secondaryCoordEnd: number;
}

export default class Solver17 extends BaseSolver<IRange[]> {
  protected filePath = '17.txt';

  protected solvePart1(input: IRange[]): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2(input: IRange[]): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): IRange[] {
    return textInput.split(EOL).map(line => {
      const [_, primaryCoordName, primaryCoordText, secondaryCoordStartText, secondaryCoordEndText] = line.match(
        /(x|y)=([-\d]+), [xy]=([-\d]+)\.\.([-\d]+)/
      )!;
      return {
        isRow: primaryCoordName === 'y',
        primaryCoord: parseInt(primaryCoordText, 10),
        secondaryCoordEnd: parseInt(secondaryCoordEndText, 10),
        secondaryCoordStart: parseInt(secondaryCoordStartText, 10),
      } as IRange;
    });
  }
}
