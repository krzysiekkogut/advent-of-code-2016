import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type OPEN = '.';
type TREE = '|';
type LUMBERYARD = '#';
type Field = OPEN | TREE | LUMBERYARD;

export default class Solver18 extends BaseSolver<Field[][]> {
  protected filePath = '18.txt';

  protected solvePart1(input: Field[][]): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2(input: Field[][]): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): Field[][] {
    return textInput.split(EOL).map(line => {
      const row: Field[] = [];
      for (const c of line) {
        row.push(c as Field);
      }
      return row;
    });
  }
}
