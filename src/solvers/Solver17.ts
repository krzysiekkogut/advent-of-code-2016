import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IRange {
  isRow: boolean;
  primaryCoord: number;
  secondaryCoordStart: number;
  secondaryCoordEnd: number;
}

interface IMap {
  data: string[][];
  minY: number;
  maxY: number;
}

export default class Solver17 extends BaseSolver<IRange[]> {
  protected filePath = '17.txt';

  protected solvePart1(input: IRange[]): number {
    const map = this.createMap(input);

    this.flow(
      0,
      500,
      map
    );

    return map.data
      .filter((_, index) => index >= map.minY)
      .reduce((prev, curr) => prev.concat(curr), [])
      .filter(s => s === '~' || s === '|').length;
  }

  protected solvePart2(input: IRange[]): number {
    const map = this.createMap(input);

    this.flow(
      0,
      500,
      map
    );

    return map.data
      .filter((_, index) => index >= map.minY)
      .reduce((prev, curr) => prev.concat(curr), [])
      .filter(s => s === '~').length;
  }

  protected parseInput(textInput: string): IRange[] {
    return textInput.split(EOL).map(line => {
      const [_, primaryCoordName, primaryCoord, secondaryCoordStart, secondaryCoordEnd] = line.match(
        /(x|y)=([-\d]+), [xy]=([-\d]+)\.\.([-\d]+)/
      )!;
      return {
        isRow: primaryCoordName === 'y',
        primaryCoord: parseInt(primaryCoord),
        secondaryCoordEnd: parseInt(secondaryCoordEnd),
        secondaryCoordStart: parseInt(secondaryCoordStart),
      } as IRange;
    });
  }

  private createMap(ranges: IRange[]): IMap {
    let minY = Infinity;
    let maxY = -Infinity;
    let maxX = -Infinity;

    for (const range of ranges) {
      if (range.isRow) {
        minY = Math.min(minY, range.primaryCoord);
        maxY = Math.max(maxY, range.primaryCoord);
        maxX = Math.max(maxX, range.secondaryCoordEnd);
      } else {
        minY = Math.min(minY, range.secondaryCoordStart);
        maxY = Math.max(maxY, range.secondaryCoordEnd);
        maxX = Math.max(maxX, range.primaryCoord);
      }
    }

    const map: string[][] = new Array(maxY + 1);
    for (let i = 0; i < map.length; i++) {
      map[i] = new Array(maxX + 4).fill('.');
    }

    map[0][500] = '+';

    for (const range of ranges) {
      for (let i = range.secondaryCoordStart; i <= range.secondaryCoordEnd; i++) {
        if (range.isRow) {
          map[range.primaryCoord][i] = '#';
        } else {
          map[i][range.primaryCoord] = '#';
        }
      }
    }

    return {
      data: map,
      maxY,
      minY,
    };
  }

  private flow(y: number, x: number, map: IMap): void {
    if (y >= map.maxY) return;

    const down = { y: y + 1, x };
    const left = { y, x: x - 1 };
    const right = { y, x: x + 1 };

    if (map.data[down.y][down.x] === '.') {
      map.data[down.y][down.x] = '|';
      this.flow(
        down.y,
        down.x,
        map
      );
    }

    if (['#', '~'].indexOf(map.data[down.y][down.x]) >= 0 && map.data[left.y][left.x] === '.') {
      map.data[left.y][left.x] = '|';
      this.flow(
        left.y,
        left.x,
        map
      );
    }

    if (['#', '~'].indexOf(map.data[down.y][down.x]) >= 0 && map.data[right.y][right.x] === '.') {
      map.data[right.y][right.x] = '|';
      this.flow(
        right.y,
        right.x,
        map
      );
    }

    if (
      ['#', '~'].indexOf(map.data[down.y][down.x]) >= 0 &&
      this.hasWallLeft(y, x, map) &&
      this.hasWalRight(y, x, map)
    ) {
      let xit = x;
      while (map.data[y][xit] !== '#') {
        map.data[y][xit] = '~';
        xit--;
      }

      xit = x;
      while (map.data[y][xit] !== '#') {
        map.data[y][xit] = '~';
        xit++;
      }
    }
  }

  private hasWallLeft(y: number, x: number, map: IMap): boolean {
    while (true) {
      x--;
      if (map.data[y][x] === '#') return true;
      if (map.data[y][x] === '.') return false;
    }
  }

  private hasWalRight(y: number, x: number, map: IMap): boolean {
    while (true) {
      x++;
      if (map.data[y][x] === '#') return true;
      if (map.data[y][x] === '.') return false;
    }
  }
}
