import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type Direction = '>' | '<' | 'v' | '^';
type Track = '-' | '|' | '/' | '\\' | '+' | ' ';

interface ITrack {
  type: Track;
  isCartHere: boolean;
}

interface ICart {
  x: number;
  y: number;
  direction: Direction;
  id: number;
  junctionsCount: number;
}

interface IMap {
  tracks: ITrack[][];
  carts: ICart[];
}

export default class Solver13 extends BaseSolver<IMap> {
  protected filePath: string = '13.txt';

  protected solvePart1(input: IMap): string {
    let i = 0;
    while (true) {
      const colision = this.moveCarts(input);
      i++;
      if (colision) {
        return `${colision.x},${colision.y}`;
      }
    }
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
      tracks[y] = new Array<ITrack>(lines[y].length);
      for (let x = 0; x < lines[y].length; x++) {
        switch (lines[y][x]) {
          case '>':
          case '<':
            tracks[y][x] = { type: '-', isCartHere: true };
            carts.push({ direction: lines[y][x] as Direction, id, junctionsCount: 0, x, y });
            id++;
            break;
          case 'v':
          case '^':
            tracks[y][x] = { type: '|', isCartHere: true };
            carts.push({ direction: lines[y][x] as Direction, id, junctionsCount: 0, x, y });
            id++;
            break;
          case '+':
            tracks[y][x] = { type: lines[y][x] as Track, isCartHere: false };
            break;
          default:
            tracks[y][x] = { type: lines[y][x] as Track, isCartHere: false };
            break;
        }
      }
    }

    return { carts, tracks };
  }

  private moveCarts(map: IMap): { x: number; y: number } | null {
    for (const cart of map.carts) {
      let newX = cart.x;
      let newY = cart.y;
      let newDirection: Direction = cart.direction;
      switch (map.tracks[cart.y][cart.x].type) {
        case '-':
          switch (cart.direction) {
            case '>':
              newX++;
              break;
            case '<':
              newX--;
              break;
          }
          break;
        case '|':
          switch (cart.direction) {
            case '^':
              newY--;
              break;
            case 'v':
              newY++;
              break;
          }
          break;
        case '/':
          switch (cart.direction) {
            case '>':
              newDirection = '^';
              newY--;
              break;
            case '<':
              newDirection = 'v';
              newY++;
              break;
            case '^':
              newDirection = '>';
              newX++;
              break;
            case 'v':
              newDirection = '<';
              newX--;
              break;
          }
          break;
        case '\\':
          switch (cart.direction) {
            case '>':
              newDirection = 'v';
              newY++;
              break;
            case '<':
              newDirection = '^';
              newY--;
              break;
            case '^':
              newDirection = '<';
              newX--;
              break;
            case 'v':
              newDirection = '>';
              newX++;
              break;
          }
          break;
        case '+':
          const count = cart.junctionsCount % 3;
          cart.junctionsCount++;
          switch (count) {
            case 0: // left
              switch (cart.direction) {
                case '<':
                  newDirection = 'v';
                  newY++;
                  break;
                case '>':
                  newDirection = '^';
                  newY--;
                  break;
                case '^':
                  newDirection = '<';
                  newX--;
                  break;
                case 'v':
                  newDirection = '>';
                  newX++;
                  break;
              }
              break;
            case 1: // straight
              switch (cart.direction) {
                case '<':
                  newX--;
                  break;
                case '>':
                  newX++;
                  break;
                case '^':
                  newY--;
                  break;
                case 'v':
                  newY++;
                  break;
              }
              break;
            case 2: // right
              switch (cart.direction) {
                case '<':
                  newDirection = '^';
                  newY--;
                  break;
                case '>':
                  newDirection = 'v';
                  newY++;
                  break;
                case '^':
                  newDirection = '>';
                  newX++;
                  break;
                case 'v':
                  newDirection = '<';
                  newX--;
                  break;
              }
              break;
          }
          break;
      }

      if (map.tracks[newY][newX].isCartHere) {
        return { x: newX, y: newY };
      }

      map.tracks[cart.y][cart.x].isCartHere = false;
      map.tracks[newY][newX].isCartHere = true;
      cart.direction = newDirection;
      cart.x = newX;
      cart.y = newY;
    }

    return null;
  }
}
