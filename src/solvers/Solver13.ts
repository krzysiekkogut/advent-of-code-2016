import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type Direction = '>' | '<' | 'v' | '^';
type Track = '-' | '|' | '/' | '\\' | '+' | ' ';

interface ITrack {
  type: Track;
  cartCount?: Map<number, number>;
}

interface ICart {
  x: number;
  y: number;
  direction: Direction;
  id: number;
}

interface IMap {
  tracks: ITrack[][];
  carts: ICart[];
}

export default class Solver13 extends BaseSolver<IMap> {
  protected filePath: string = '13.txt';

  protected solvePart1(input: IMap): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2(input: IMap): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): IMap {
    const lines = textInput.split(EOL).filter(line => line !== '');
    const tracks = new Array<ITrack[]>(lines.length);
    const carts: ICart[] = [];
    let id = 0;
    for (let y = 0; y < tracks.length; y++) {
      for (let x = 0; x < lines[y].length; x++) {
        switch (lines[y][x]) {
          case '>':
          case '<':
            tracks[y][x] = { type: '-' };
            carts.push({ direction: lines[y][x] as Direction, id, x, y });
            id++;
            break;
          case 'v':
          case '^':
            tracks[y][x] = { type: '|' };
            carts.push({ direction: lines[y][x] as Direction, id, x, y });
            id++;
            break;
          case '+':
            tracks[y][x] = { type: lines[y][x] as Track, cartCount: new Map<number, number>() };
            break;
          default:
            tracks[y][x] = { type: lines[y][x] as Track };
            break;
        }
      }
    }

    return { carts, tracks };
  }
}
