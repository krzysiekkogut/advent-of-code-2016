import { EOL } from 'os';
import Field from './Field';

export default class FightMap {
  public noOfFinishedRounds = 0;

  private mapData: Field[][];

  constructor(mapText: string) {
    this.mapData = [];
    mapText
      .split(EOL)
      .map(line => line.trim())
      .filter(line => !!line)
      .forEach((line, rowNo) => {
        this.mapData.push([]);
        for (let colNo = 0; colNo < line.length; colNo++) {
          switch (line[colNo]) {
            case 'E':
              this.mapData[rowNo].push(new Field(rowNo, colNo, 'E', true, false));
              break;
            case 'G':
              this.mapData[rowNo].push(new Field(rowNo, colNo, 'G', true, false));
              break;
            case '#':
              this.mapData[rowNo].push(new Field(rowNo, colNo, 'none', true, false));
              break;
            case '.':
              this.mapData[rowNo].push(new Field(rowNo, colNo, 'none', true, false));
              break;
          }
        }
      });
  }

  public get(row: number, col: number): Field {
    return this.mapData[row][col];
  }

  public set(row: number, col: number, field: Field): void {
    this.mapData[row][col] = field;
  }
}
