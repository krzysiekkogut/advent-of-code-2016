import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IPoint {
  x: number;
  y: number;
  z: number;
}

interface INanoBot {
  position: IPoint;
  radius: number;
}

export default class Solver23 extends BaseSolver<INanoBot[]> {
  protected filePath = '23.txt';

  protected solvePart1(nanobots: INanoBot[]): number {
    const strongestBot = nanobots.sort((botA, botB) => botB.radius - botA.radius)[0];
    return nanobots.filter(bot => this.distance(strongestBot.position, bot.position) <= strongestBot.radius).length;
  }

  protected solvePart2(bots: INanoBot[]): number {
    const minDimensions: IPoint = { x: Infinity, y: Infinity, z: Infinity };
    const maxDimensions: IPoint = { x: -Infinity, y: -Infinity, z: -Infinity };
    for (const { x, y, z } of bots.map(b => b.position)) {
      minDimensions.x = Math.min(minDimensions.x, x);
      minDimensions.y = Math.min(minDimensions.y, y);
      minDimensions.z = Math.min(minDimensions.z, z);
      maxDimensions.x = Math.max(maxDimensions.x, x);
      maxDimensions.y = Math.max(maxDimensions.y, y);
      maxDimensions.z = Math.max(maxDimensions.z, z);
    }

    let gridSize = maxDimensions.x - minDimensions.x;
    let gridWithMostBots: IPoint;

    while (gridSize >= 1) {
      let maxCount = -Infinity;
      // loop through grid corners
      for (let x = minDimensions.x; x <= maxDimensions.x; x += gridSize) {
        for (let y = minDimensions.y; y <= maxDimensions.y; y += gridSize) {
          for (let z = minDimensions.z; z <= maxDimensions.z; z += gridSize) {
            const count = bots.filter(bot => this.distance({ x, y, z }, bot.position) - bot.radius < gridSize).length;
            if (count > maxCount) {
              maxCount = count;
              gridWithMostBots = { x, y, z };
            } else if (count === maxCount && this.distance({ x, y, z }) < this.distance(gridWithMostBots!)) {
              gridWithMostBots = { x, y, z };
            }
          }
        }
      }

      // narrow search grid for the current best - use it as a center
      minDimensions.x = gridWithMostBots!.x - gridSize;
      minDimensions.y = gridWithMostBots!.y - gridSize;
      minDimensions.z = gridWithMostBots!.z - gridSize;
      maxDimensions.x = gridWithMostBots!.x + gridSize;
      maxDimensions.y = gridWithMostBots!.y + gridSize;
      maxDimensions.z = gridWithMostBots!.z + gridSize;

      // change grid size to smaller
      gridSize = Math.floor(gridSize / 2);
    }

    return this.distance(gridWithMostBots);
  }

  protected parseInput(textInput: string): INanoBot[] {
    return textInput.split(EOL).map(line => {
      const [x, y, z, radius] = line
        .match(/pos=<([\d-]+),([\d-]+),([\d-]+)>, r=([\d-]+)/)!
        .slice(1)
        .map(parseInt);
      return {
        position: { x, y, z },
        radius,
      } as INanoBot;
    });
  }

  private distance(positionA: IPoint, positionB: IPoint = { x: 0, y: 0, z: 0 }): number {
    return (
      Math.abs(positionA.x - positionB.x) + Math.abs(positionA.y - positionB.y) + Math.abs(positionA.z - positionB.z)
    );
  }
}
