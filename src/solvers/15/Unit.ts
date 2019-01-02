import Field from './Field';
import FightMap from './FightMap';
import NoEnemiesError from './NoEnemiesError';

type UnitType = 'E' | 'G';

interface IGraphField {
  field: Field;
  parent: IGraphField | null;
}
export default class Unit {
  public attackPower: number = 3;
  public hitPoints: number = 200;

  constructor(private map: FightMap, public unitType: UnitType, public row: number, public col: number) {}

  public move(): void {
    const fields = this.getAdjacentFields(this.map.get(this.row, this.col)!);
    if (fields.some(f => !!f.unit)) return;

    const enemies = this.map.getAllUnits().filter(unit => unit.unitType !== this.unitType && unit.hitPoints > 0);
    if (enemies.length === 0) {
      throw new NoEnemiesError();
    }

    const currentField = this.map.get(this.row, this.col)!;
    const path: Field[] = this.getAllPathsToTargets(currentField);

    const nextStep: Field = path[0];
    // .sort((pathA, pathB) => {
    //   // sort by path target
    //   const targetA = pathA[pathA.length - 1];
    //   const targetB = pathB[pathB.length - 1];

    //   if (targetA === targetB) return 0;
    //   if (targetA.row < targetB.row) return -1;
    //   if (targetA.row > targetB.row) return 1;
    //   return targetA.col < targetB.col ? -1 : 1;
    // })
    // .filter((path, index, allPaths) => {
    //   // get paths to first target
    //   const target = allPaths[0][allPaths[0].length - 1];
    //   const pathTarget = path[path.length - 1];
    //   return target === pathTarget;
    // })
    // .map(path => path[0]) // get first steps
    // .sort((fieldA, fieldB) => (fieldA.row < fieldB.row ? -1 : fieldA.col < fieldB.col ? -1 : 1))[0];

    currentField.unit = null;
    nextStep.unit = this;
  }

  public attack(): void {
    const fields = this.getAdjacentFields(this.map.get(this.row, this.col)!);
    for (const field of fields) {
      if (field.unit) {
        return this.attackUnitOnField(field, field.unit!);
      }
    }
  }

  private getAdjacentFields(field: Field): Field[] {
    const up = this.map.get(this.row - 1, this.col);
    const left = this.map.get(this.row, this.col - 1);
    const right = this.map.get(this.row, this.col + 1);
    const down = this.map.get(this.row + 1, this.col);

    return [up, left, right, down].filter(f => !!f) as Field[];
  }

  private getAllPathsToTargets(start: Field): Field[] {
    const queue: IGraphField[] = [{ field: start, parent: null }];

    let target = null;

    while (queue.length > 0 && target === null) {
      const currentBFS = queue.shift()!;
      if (this.isFieldInRange(currentBFS.field)) {
        target = currentBFS;
      }

      const nextFields = this.getAdjacentFields(currentBFS.field).map(field => ({ field, parent: currentBFS }));
      queue.push(...nextFields);
    }

    const path = [target!.field];
    let curr = target!.parent;
    while (curr) {
      path.push(curr.field);
      curr = curr.parent;
    }

    return path.reverse();
  }

  private isFieldInRange(field: Field): boolean {
    const fields = this.getAdjacentFields(field);
    return fields.some(f => !!f.unit && f.unit.unitType !== this.unitType);
  }

  private attackUnitOnField(field: Field, unit: Unit): void {
    unit.hitPoints -= this.attackPower;
    if (unit.hitPoints <= 0) {
      field.unit = null;
    }
  }
}
