import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type OPEN = '.';
type TREE = '|';
type LUMBERYARD = '#';
type Field = OPEN | TREE | LUMBERYARD;

export default class Solver18 extends BaseSolver<Field[][]> {
  protected filePath = '18.txt';

  protected solvePart1(input: Field[][]): string {
    for (let i = 0; i < 10; i++) {
      const next = this.applyChanges(input);
      input = next;
    }

    let trees = 0;
    let lumberyards = 0;
    for (const row of input) {
      for (const field of row) {
        if (field === '#') lumberyards++;
        if (field === '|') trees++;
      }
    }

    return (trees * lumberyards).toString();
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

  private copyArea(area: Field[][]): Field[][] {
    const copy = new Array<Field[]>(area.length);
    for (let i = 0; i < copy.length; i++) {
      copy[i] = new Array<Field>(area[0].length);
      for (let j = 0; j < area[i].length; j++) {
        copy[i][j] = area[i][j];
      }
    }
    return copy;
  }

  private applyChanges(input: Field[][]): Field[][] {
    const next = this.copyArea(input);
    for (let x = 0; x < input.length; x++) {
      for (let y = 0; y < input[x].length; y++) {
        const field = input[x][y];
        const adjacent = this.getAdjacentFields(x, y, input);
        switch (field) {
          case '.':
            next[x][y] = adjacent.filter(f => f === '|').length >= 3 ? '|' : '.';
            break;
          case '|':
            next[x][y] = adjacent.filter(f => f === '#').length >= 3 ? '#' : '|';
            break;
          case '#':
            const noOfAdjacentLumberyards = adjacent.filter(f => f === '#').length;
            const noOfAdjacentTrees = adjacent.filter(f => f === '|').length;
            next[x][y] = noOfAdjacentLumberyards === 0 || noOfAdjacentTrees === 0 ? '.' : '#';
            break;
        }
      }
    }

    return next;
  }

  private getAdjacentFields(x: number, y: number, area: Field[][]): Field[] {
    const adjacent: Field[] = [];
    if (x - 1 >= 0) adjacent.push(area[x - 1][y - 1], area[x - 1][y], area[x - 1][y + 1]);
    adjacent.push(area[x][y - 1], area[x][y + 1]);
    if (x + 1 < area.length) adjacent.push(area[x + 1][y - 1], area[x + 1][y], area[x + 1][y + 1]);
    return adjacent.filter(f => !!f);
  }
}
