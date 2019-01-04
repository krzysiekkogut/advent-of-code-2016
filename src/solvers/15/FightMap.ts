import { EOL } from 'os';
import Field from './Field';
import Unit from './Unit';

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
              this.mapData[rowNo].push(new Field(rowNo, colNo, this, true, new Unit(this, 'E', rowNo, colNo)));
              break;
            case 'G':
              this.mapData[rowNo].push(new Field(rowNo, colNo, this, true, new Unit(this, 'G', rowNo, colNo)));
              break;
            case '#':
              this.mapData[rowNo].push(new Field(rowNo, colNo, this, false));
              break;
            case '.':
              this.mapData[rowNo].push(new Field(rowNo, colNo, this, true));
              break;
          }
        }
      });
  }

  public get startNextRound(): boolean {
    const units = this.getAllUnits();
    const areAnyElfs = units.some(u => u.unitType === 'E');
    const areAnyGoblins = units.some(u => u.unitType === 'G');
    return areAnyElfs && areAnyGoblins;
  }

  public get ROWS(): number {
    return this.mapData.length;
  }

  public get COLS(): number {
    return this.mapData[0].length;
  }

  public print() {
    // tslint:disable:no-console
    console.log(`\nRound: ${this.noOfFinishedRounds}`);
    this.mapData.forEach(l => {
      let hpInfo = '';
      const line = l
        .map(f => {
          if (f.unit && f.unit.hitPoints > 0) {
            hpInfo += ` (${f.unit.hitPoints}) `;
            return f.unit.unitType;
          }

          return f.isCavern ? '.' : '#';
        })
        .join('');

      console.log(line + hpInfo);
    });
  }

  public get(row: number, col: number): Field | null {
    if (row < 0 || row >= this.mapData.length || col < 0 || col >= this.mapData[0].length) {
      return null;
    }

    return this.mapData[row][col];
  }

  public getAllUnits(): Unit[] {
    const units: Unit[] = [];
    this.mapData.forEach(mapRow =>
      mapRow.forEach(field => {
        if (field.unit) {
          units.push(field.unit);
        }
      })
    );

    return units;
  }
}
