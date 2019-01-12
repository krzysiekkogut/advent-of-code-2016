import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface INode extends IState {
  distance: number;
}

interface IState {
  elevatorPosition: number;
  floors: Floors;
}

interface IItem {
  type: 'm' | 'g';
  name: string;
}

type Floors = IItem[][];

const FLOORS = 4;

export default class Solver11 extends BaseSolver<Floors> {
  protected filePath = '11.txt';

  protected solvePart1(initialFloors: Floors): number {
    const queue: INode[] = [{ distance: 0, elevatorPosition: 0, floors: initialFloors }];
    const visited = new Set<string>();
    visited.add(this.hash(queue[0]));

    while (queue.length > 0) {
      const { distance, elevatorPosition, floors } = queue.shift()!;
      if (floors.slice(0, -1).every(floor => floor.length === 0)) {
        return distance;
      }

      queue.push(
        ...this.getNextStates(elevatorPosition, floors, visited).map(state => ({ ...state, distance: distance + 1 }))
      );
    }

    throw new Error('Incorrect input.');
  }

  protected solvePart2(initialFloors: Floors): number {
    initialFloors[0].push(
      { name: 'elerium', type: 'g' },
      { name: 'elerium', type: 'm' },
      { name: 'dilithium', type: 'g' },
      { name: 'dilithium', type: 'm' }
    );
    return this.solvePart1(initialFloors);
  }

  protected parseInput(textInput: string): Floors {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => (line.endsWith('nothing relevant.') ? [] : this.getItems(line)));
  }

  private getItems(text: string): IItem[] {
    const generators = (text.match(/(\w+) generator/g)! || [])
      .map(match => match.split(' ')[0].trim())
      .map(name => ({ name, type: 'g' } as IItem));
    const microchips = (text.match(/(\w+)-compatible microchip/g)! || [])
      .map(match => match.split('-')[0].trim())
      .map(name => ({ name, type: 'm' } as IItem));
    return generators.concat(microchips);
  }

  private clone(floors: Floors): Floors {
    return floors.map(floor => floor.map(item => ({ ...item })));
  }

  private hash({ elevatorPosition, floors }: IState): string {
    const elementFloors = new Array<{ generator: number; microchip: number }>(
      floors.reduce((sum, items) => sum + items.length, 0) / 2
    );
    for (let i = 0; i < elementFloors.length; i++) {
      elementFloors[i] = {
        generator: -1,
        microchip: -1,
      };
    }
    const elementNames: string[] = [];

    for (let floor = 0; floor < floors.length; floor++) {
      for (const item of floors[floor]) {
        let elementIndex = elementNames.indexOf(item.name);
        if (elementIndex < 0) {
          elementNames.push(item.name);
          elementIndex = elementNames.length - 1;
        }

        if (item.type === 'g') {
          elementFloors[elementIndex].generator = floor;
        } else {
          elementFloors[elementIndex].microchip = floor;
        }
      }
    }

    return (
      elementFloors
        .sort((a, b) => (a.generator === b.generator ? a.microchip - b.microchip : a.generator - b.generator))
        .map(f => `${f.generator}_${f.microchip}`)
        .join(';') +
      '#' +
      elevatorPosition
    );
  }

  private getNextStates(elevatorPosition: number, floors: Floors, visited: Set<string>): IState[] {
    const candidates = new Array<IState>();

    for (const newFloor of [-1, 1].map(n => elevatorPosition + n).filter(n => n >= 0 && n < FLOORS)) {
      for (let a = 0; a < floors[elevatorPosition].length; a++) {
        const clonedFloors = this.clone(floors);
        const item = clonedFloors[elevatorPosition].splice(a, 1)[0];
        clonedFloors[newFloor].push(item);
        this.addCandidate(candidates, visited, clonedFloors, elevatorPosition, newFloor);
      }

      for (let a = 0; a < floors[elevatorPosition].length; a++) {
        for (let b = a + 1; b < floors[elevatorPosition].length; b++) {
          const clonedFloors = this.clone(floors);
          const item1 = clonedFloors[elevatorPosition].splice(a, 1)[0];
          const item2 = clonedFloors[elevatorPosition].splice(b - 1, 1)[0];
          clonedFloors[newFloor].push(item1, item2);
          this.addCandidate(candidates, visited, clonedFloors, elevatorPosition, newFloor);
        }
      }
    }

    return candidates;
  }

  private addCandidate(
    candidates: IState[],
    visited: Set<string>,
    floors: Floors,
    elevatorPosition: number,
    newFloor: number
  ): void {
    const hash = this.hash({ floors, elevatorPosition: newFloor });
    if (this.isFloorAllowed(floors[elevatorPosition]) && this.isFloorAllowed(floors[newFloor]) && !visited.has(hash)) {
      candidates.push({ floors, elevatorPosition: newFloor });
      visited.add(hash);
    }
  }

  private isFloorAllowed(items: IItem[]): boolean {
    if (items.length < 2) return true;
    if (items.every(item => item.type === 'm')) return true;
    if (items.every(item => item.type === 'g')) return true;

    return items
      .filter(item => item.type === 'm')
      .every(microchip => !!items.find(item => item.type === 'g' && item.name === microchip.name));
  }
}
