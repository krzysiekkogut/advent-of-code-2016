import Field from './Field';
import FightMap from './FightMap';

type UnitType = 'E' | 'G';

interface IGraphField {
  field: Field;
  parent: IGraphField | null;
}
export default class Unit {
  public attackPower: number = 3;
  public hitPoints: number = 200;

  constructor(private map: FightMap, public unitType: UnitType, public row: number, public col: number) {}

  public get field(): Field {
    return this.map.get(this.row, this.col)!;
  }

  public move(): boolean {
    const enemies = this.map.getAllUnits().filter(unit => unit.unitType !== this.unitType);
    if (enemies.length === 0) {
      return false;
    }

    const nextStep: Field = this.getNextStep(this.field);
    this.field.unit = null;
    nextStep.unit = this;
    this.row = nextStep.row;
    this.col = nextStep.col;
    return true;
  }

  public attack(): void {
    const target = this.getAdjacentFields(this.field).find(f => !!f.unit && f.unit.unitType !== this.unitType);
    if (target) {
      target.unit!.hitPoints -= this.attackPower;
    }

    if (target && target.unit!.hitPoints <= 0) {
      target.unit = null;
    }
  }

  private getAdjacentFields(field: Field): Field[] {
    const up = this.map.get(field.row - 1, field.col);
    const left = this.map.get(field.row, field.col - 1);
    const right = this.map.get(field.row, field.col + 1);
    const down = this.map.get(field.row + 1, field.col);

    return [up, left, right, down].filter(f => f && f.isCavern) as Field[];
  }

  private getNextStep(start: Field): Field {
    const visited = new Array(this.map.ROWS);
    for (let i = 0; i < visited.length; i++) {
      visited[i] = new Array(this.map.COLS).fill(false);
    }

    let target = null;
    const queue: IGraphField[] = [{ field: start, parent: null }];
    while (queue.length > 0 && target === null) {
      const currentNode = queue.shift()!;
      if (!visited[currentNode.field.row][currentNode.field.col]) {
        visited[currentNode.field.row][currentNode.field.col] = true;

        if (this.isFieldInRange(currentNode.field)) {
          target = currentNode;
        }

        const nextFields = this.getAdjacentFields(currentNode.field)
          .filter(f => !f.unit)
          .map(field => ({ field, parent: currentNode }));
        queue.push(...nextFields);
      }
    }

    if (target === null || target.field === start) {
      return start;
    }

    const path = [];
    let curr: IGraphField | null = target;
    while (curr) {
      path.push(curr.field);
      curr = curr.parent;
    }

    return path.reverse()[1];
  }

  private isFieldInRange(field: Field): boolean {
    const fields = this.getAdjacentFields(field);
    return fields.some(f => !!f.unit && f.unit.unitType !== this.unitType);
  }
}
