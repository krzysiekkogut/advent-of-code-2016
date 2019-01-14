import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IDisc {
  level: number;
  positionsCount: number;
  position: number;
}

export default class Solver15 extends BaseSolver<IDisc[]> {
  protected filePath = '15.txt';

  protected solvePart1(discs: IDisc[]): number {
    for (const disc of discs) {
      disc.position += disc.level;
      disc.position %= disc.positionsCount;
    }

    let time = 0;

    while (!discs.every(disc => disc.position === 0)) {
      for (const disc of discs) {
        disc.position++;
        disc.position %= disc.positionsCount;
      }

      time++;
    }

    return time;
  }

  protected solvePart2(discs: IDisc[]): number {
    discs.push({ level: discs.length + 1, position: 0, positionsCount: 11 });
    return this.solvePart1(discs);
  }

  protected parseInput(textInput: string): IDisc[] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => {
        const [level, positionsCount, position] = line
          .match(/Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\./)!
          .slice(1)
          .map(n => parseInt(n));
        return {
          level,
          position,
          positionsCount,
        };
      });
  }
}
