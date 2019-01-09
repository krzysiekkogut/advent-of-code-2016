import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface ICoords {
  x: number;
  y: number;
}

interface IPoint {
  position: ICoords;
  velocity: ICoords;
}

export default class Solver10 extends BaseSolver<IPoint[], string> {
  protected filePath: string = '10.txt';

  protected solvePart1(input: IPoint[]): string {
    let minW = Math.max(...input.map(p => p.position.x)) - Math.min(...input.map(p => p.position.x));
    let minH = Math.max(...input.map(p => p.position.y)) - Math.min(...input.map(p => p.position.y));

    let gettingSmaller = true;
    let second = 1;
    while (gettingSmaller) {
      const nextPoints = input.map(p => ({ position: { ...p.position }, velocity: p.velocity }));
      nextPoints.forEach(point => {
        point.position.x += point.velocity.x;
        point.position.y += point.velocity.y;
      });
      const w = Math.max(...nextPoints.map(p => p.position.x)) - Math.min(...nextPoints.map(p => p.position.x));
      const h = Math.max(...nextPoints.map(p => p.position.y)) - Math.min(...nextPoints.map(p => p.position.y));

      if (w <= minW || h <= minH) {
        minW = w;
        minH = h;
        input = nextPoints.map(p => ({ position: { ...p.position }, velocity: p.velocity }));
        second++;
      } else {
        gettingSmaller = false;
      }
    }

    input.sort((pointA, pointB) =>
      pointA.position.y === pointB.position.y
        ? pointA.position.x - pointB.position.x
        : pointA.position.y - pointB.position.y
    );
    this.printSky(
      input,
      minW,
      minH,
      Math.min(...input.map(p => p.position.y)),
      Math.min(...input.map(p => p.position.x))
    );

    return `Read message from above console log. Part2: second: ${second - 1}.`;
  }

  protected solvePart2(input: IPoint[]): string {
    return this.solvePart1(input);
  }

  protected parseInput(textInput: string): IPoint[] {
    return textInput.split(EOL).map(line => {
      const [positionX, positionY, velocityX, velocityY] = line
        .match(/position=<\s*([\d-]+),\s*([\d-]+)> velocity=<\s*([\d-]+),\s*([\d-]+)>/)!
        .slice(1)
        .map(n => parseInt(n.trim()));

      return {
        position: {
          x: positionX,
          y: positionY,
        },
        velocity: {
          x: velocityX,
          y: velocityY,
        },
      };
    });
  }

  private printSky(sortedPoints: IPoint[], width: number, height: number, minY: number, minX: number): void {
    const skyMap: string[][] = new Array<string[]>(height + 1);
    for (let i = 0; i < skyMap.length; i++) {
      skyMap[i] = new Array<string>(width + 1).fill(' ');
    }

    sortedPoints.forEach(point => {
      skyMap[point.position.y - minY][point.position.x - minX] = '*';
    });

    for (const row of skyMap) {
      // tslint:disable-next-line:no-console
      console.log(row.join(''));
    }
  }
}
