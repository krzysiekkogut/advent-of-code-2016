import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface ISpaceTimePoint {
  x: number;
  y: number;
  z: number;
  t: number;
}

export default class Solver25 extends BaseSolver<ISpaceTimePoint[]> {
  protected filePath = '25.txt';

  protected solvePart1(input: ISpaceTimePoint[]): string {
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

    return constellations.length.toString();
  }

  protected solvePart2(input: ISpaceTimePoint[]): string {
    return 'Day 25 does not have second part :)';
  }

  protected parseInput(textInput: string): ISpaceTimePoint[] {
    return textInput
      .split(EOL)
      .map(l => l.trim())
      .filter(line => !!line)
      .map(line => {
        const coords = line.split(',');
        return {
          x: parseInt(coords[0], 10),
          y: parseInt(coords[1], 10),
          z: parseInt(coords[2], 10),
          // tslint:disable-next-line:object-literal-sort-keys
          t: parseInt(coords[3], 10),
        } as ISpaceTimePoint;
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
