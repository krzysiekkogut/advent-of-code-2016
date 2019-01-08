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

  protected solvePart1(nanobots: INanoBot[]): string {
    const strongestBot = nanobots.sort((botA, botB) => botB.radius - botA.radius)[0];
    return nanobots.filter(bot => this.inRange(strongestBot, bot)).length.toString();
  }

  protected solvePart2(input: INanoBot[]): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): INanoBot[] {
    return textInput.split(EOL).map(line => {
      const [_, x, y, z, radius] = line.match(/pos=<([\d-]+),([\d-]+),([\d-]+)>, r=([\d-]+)/)!;
      return {
        position: { x: parseInt(x, 10), y: parseInt(y, 10), z: parseInt(z, 10) },
        radius: parseInt(radius, 10),
      } as INanoBot;
    });
  }

  private inRange(strongestBot: INanoBot, bot: INanoBot): boolean {
    const distance =
      Math.abs(strongestBot.position.x - bot.position.x) +
      Math.abs(strongestBot.position.y - bot.position.y) +
      Math.abs(strongestBot.position.z - bot.position.z);
    return distance <= strongestBot.radius;
  }
}
