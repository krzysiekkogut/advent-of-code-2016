import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface ISpaceTimePoint {
  x: number;
  y: number;
  z: number;
  t: number;
}

export default class Solver25 extends BaseSolver<ISpaceTimePoint[], number, string> {
  protected filePath = '25.txt';

  protected solvePart1(input: ISpaceTimePoint[]): number {
    let constellations: ISpaceTimePoint[][] = [];
    for (const point of input) {
      const newConstellations: ISpaceTimePoint[][] = [];
      const matchingConstellations: ISpaceTimePoint[][] = [];
      for (const constellation of constellations) {
        if (constellation.some(constellationPoint => this.getDistance(constellationPoint, point) <= 3)) {
          matchingConstellations.push(constellation);
        } else {
          newConstellations.push(constellation);
        }
      }

      if (matchingConstellations.length === 0) {
        newConstellations.push([point]);
      } else {
        newConstellations.push([point].concat(...matchingConstellations));
      }

      constellations = newConstellations;
    }

    return constellations.length;
  }

  protected solvePart2(): string {
    return 'Day 25 does not have second part :)';
  }

  protected parseInput(textInput: string): ISpaceTimePoint[] {
    return textInput
      .split(EOL)
      .map(l => l.trim())
      .filter(line => !!line)
      .map(line => {
        const [x, y, z, t] = line.split(',').map(parseInt);
        return { t, x, y, z };
      });
  }

  private getDistance(pointA: ISpaceTimePoint, pointB: ISpaceTimePoint): number {
    const xDistance = Math.abs(pointA.x - pointB.x);
    const yDistance = Math.abs(pointA.y - pointB.y);
    const zDistance = Math.abs(pointA.z - pointB.z);
    const tDistance = Math.abs(pointA.t - pointB.t);

    return xDistance + yDistance + zDistance + tDistance;
  }
}
