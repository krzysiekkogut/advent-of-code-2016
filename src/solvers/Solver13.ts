import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type Direction = '>' | '<' | 'v' | '^';
type Track = '-' | '|' | '/' | '\\' | '+' | ' ';

interface ITrack {
  type: Track;
  cart?: ICart;
}

interface ICart {
  x: number;
  y: number;
  direction: Direction;
  id: number;
  junctionsCount: number;
  alive: boolean;
}

interface IMap {
  tracks: ITrack[][];
  carts: ICart[];
}

export default class Solver13 extends BaseSolver<IMap, string> {
  protected filePath: string = '13.txt';

  protected solvePart1(input: IMap): string {
    while (true) {
      const colision = this.moveCarts(input);
      input.carts.sort((cart1, cart2) => (cart1.y < cart2.y ? -1 : cart1.y > cart2.y ? 1 : cart1.x < cart2.x ? -1 : 1));
      if (colision) {
        return `${colision.x},${colision.y}`;
      }
    }
  }

  protected solvePart2(input: IMap): string {
    while (input.carts.length > 1) {
      this.moveCarts(input, true);
      input.carts = input.carts.filter(c => c.alive);
      input.carts.sort((cart1, cart2) => (cart1.y < cart2.y ? -1 : cart1.y > cart2.y ? 1 : cart1.x < cart2.x ? -1 : 1));
    }

    const outstandingCart = input.carts[0];
    return `${outstandingCart.x},${outstandingCart.y}`;
  }

  protected parseInput(textInput: string): IMap {
    const lines = textInput.split(EOL).filter(l => !!l);
    const tracks = new Array<ITrack[]>(lines.length);
    const carts: ICart[] = [];
    let cart: ICart;
    let id = 0;
    for (let y = 0; y < tracks.length; y++) {
      tracks[y] = new Array<ITrack>(lines[y].length);
      for (let x = 0; x < lines[y].length; x++) {
        switch (lines[y][x]) {
          case '>':
          case '<':
            cart = { direction: lines[y][x] as Direction, id, junctionsCount: 0, x, y, alive: true };
            tracks[y][x] = { type: '-', cart };
            carts.push(cart);
            id++;
            break;
          case 'v':
          case '^':
            cart = { direction: lines[y][x] as Direction, id, junctionsCount: 0, x, y, alive: true };
            tracks[y][x] = { type: '|', cart };
            carts.push(cart);
            id++;
            break;
          case '+':
            tracks[y][x] = { type: lines[y][x] as Track };
            break;
          default:
            tracks[y][x] = { type: lines[y][x] as Track };
            break;
        }
      }
    }

    return { carts, tracks };
  }

  private moveCarts(
    map: IMap,
    continueAfterColision = false
  ): { x: number; y: number; cart1: ICart; cart2: ICart } | null {
    for (const cart of map.carts) {
      if (cart.alive) {
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

        map.tracks[cart.y][cart.x].cart = undefined;
        if (map.tracks[newY][newX].cart) {
          const colision = { x: newX, y: newY, cart1: cart, cart2: map.tracks[newY][newX].cart! };
          map.tracks[newY][newX].cart = undefined;
          colision.cart1.alive = colision.cart2.alive = false;
          if (!continueAfterColision) {
            return colision;
          }
        } else {
          map.tracks[newY][newX].cart = cart;
          cart.direction = newDirection;
          cart.x = newX;
          cart.y = newY;
        }
      }
    }

    return null;
  }
}
