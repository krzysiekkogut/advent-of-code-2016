import BaseSolver from './BaseSolver';

interface INode extends IPoint {
  distance: number;
}

interface IPoint {
  x: number;
  y: number;
}

export default class Solver13 extends BaseSolver<number> {
  protected filePath = '13.txt';

  protected solvePart1(designerOffice: number): number {
    const queue: INode[] = [{ x: 1, y: 1, distance: 0 }];
    const visited = new Set<string>();
    while (queue.length > 0) {
      const { x, y, distance } = queue.shift()!;
      const hash = this.hashPoint({ x, y });
      if (!visited.has(hash)) {
        visited.add(hash);
        if (x === 31 && y === 39) {
          return distance;
        }

        queue.push(...this.getNextSteps(x, y, designerOffice).map(step => ({ ...step, distance: distance + 1 })));
      }
    }

    throw new Error('Could not find path.');
  }

  protected solvePart2(designerOffice: number): number {
    const queue: INode[] = [{ x: 1, y: 1, distance: 0 }];
    const visited = new Set<string>();
    while (queue.length > 0 && queue[0].distance <= 50) {
      const { x, y, distance } = queue.shift()!;
      const hash = this.hashPoint({ x, y });
      if (!visited.has(hash)) {
        visited.add(hash);
        queue.push(...this.getNextSteps(x, y, designerOffice).map(step => ({ ...step, distance: distance + 1 })));
      }
    }

    return visited.size;
  }

  protected parseInput(textInput: string): number {
    return parseInt(textInput);
  }

  private hashPoint({ x, y }: IPoint): string {
    return `${x}_${y}`;
  }

  private getNextSteps(x: number, y: number, designerOffice: number): IPoint[] {
    return [{ x: x - 1, y }, { x: x + 1, y }, { x, y: y - 1 }, { x, y: y + 1 }]
      .filter(p => p.x >= 0 && p.y >= 0)
      .filter(p => this.isOpenSpace(p, designerOffice));
  }

  private isOpenSpace({ x, y }: IPoint, designerOffice: number): boolean {
    return (
      (x * x + 3 * x + 2 * x * y + y + y * y + designerOffice)
        .toString(2)
        .split('')
        .filter(b => b === '1').length %
        2 ===
      0
    );
  }
}
