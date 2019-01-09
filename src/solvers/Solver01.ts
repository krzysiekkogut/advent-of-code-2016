import BaseSolver from './BaseSolver';

type Move = 'R' | 'L';

interface IInstruction {
  turn: Move;
  distance: number;
}

export default class Solver01 extends BaseSolver<IInstruction[]> {
  protected filePath = '1.txt';

  protected solvePart1(instructions: IInstruction[]): number {
    const { x, y } = this.followDirections(instructions);
    return Math.abs(x) + Math.abs(y);
  }

  protected solvePart2(instructions: IInstruction[]): number {
    const { x, y } = this.followDirections(instructions, true);
    return Math.abs(x) + Math.abs(y);
  }

  protected parseInput(textInput: string): IInstruction[] {
    return textInput.split(', ').map(s => ({
      distance: parseInt(s.slice(1)),
      turn: s[0] as Move,
    }));
  }

  private followDirections(instructions: IInstruction[], stopOnRepeat = false): { x: number; y: number } {
    const visited = new Set<string>();
    let currentDirection = 0;
    let x = 0;
    let y = 0;
    visited.add(this.hash(x, y));
    for (let { turn, distance } of instructions) {
      currentDirection = this.getNewDirection(currentDirection, turn);
      switch (currentDirection) {
        case 0:
          while (distance > 0) {
            distance--;
            y++;
            if (stopOnRepeat && visited.has(this.hash(x, y))) {
              return { x, y };
            }

            visited.add(this.hash(x, y));
          }
          break;
        case 1:
          while (distance > 0) {
            distance--;
            x++;
            if (stopOnRepeat && visited.has(this.hash(x, y))) {
              return { x, y };
            }

            visited.add(this.hash(x, y));
          }
          break;
        case 2:
          while (distance > 0) {
            distance--;
            y--;
            if (stopOnRepeat && visited.has(this.hash(x, y))) {
              return { x, y };
            }

            visited.add(this.hash(x, y));
          }
          break;
        case 3:
          while (distance > 0) {
            distance--;
            x--;
            if (stopOnRepeat && visited.has(this.hash(x, y))) {
              return { x, y };
            }

            visited.add(this.hash(x, y));
          }
          break;
      }
    }

    return { x, y };
  }

  private hash(x: number, y: number): string {
    return `${x}_${y}`;
  }

  private getNewDirection(currentDirection: number, turn: Move) {
    currentDirection += turn === 'L' ? -1 : 1;
    if (currentDirection === 4) return 0;
    if (currentDirection === -1) return 3;
    return currentDirection;
  }
}
