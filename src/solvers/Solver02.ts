import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type Move = 'U' | 'L' | 'R' | 'D';
const EMPTY = '-';

export default class Solver02 extends BaseSolver<Move[][], string> {
  protected filePath = '2.txt';

  protected solvePart1(allMoves: Move[][]): string {
    const numpad = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
    const currentPosition = { col: 1, row: 1 };

    let result = '';
    for (const line of allMoves) {
      for (const move of line) {
        switch (move) {
          case 'U':
            if (currentPosition.row > 0) currentPosition.row--;
            break;
          case 'L':
            if (currentPosition.col > 0) currentPosition.col--;
            break;
          case 'R':
            if (currentPosition.col < 2) currentPosition.col++;
            break;
          case 'D':
            if (currentPosition.row < 2) currentPosition.row++;
        }
      }

      result += numpad[currentPosition.row][currentPosition.col];
    }

    return result;
  }

  protected solvePart2(allMoves: Move[][]): string {
    const numpad = [
      [EMPTY, EMPTY, '1', EMPTY, EMPTY],
      [EMPTY, '2', '3', '4', EMPTY],
      ['5', '6', '7', '8', '9'],
      [EMPTY, 'A', 'B', 'C', EMPTY],
      [EMPTY, EMPTY, 'D', EMPTY, EMPTY],
    ];
    const currentPosition = { col: 0, row: 2 };

    let result = '';

    for (const line of allMoves) {
      for (const move of line) {
        switch (move) {
          case 'U':
            if (currentPosition.row > 0 && numpad[currentPosition.row - 1][currentPosition.col] !== EMPTY) {
              currentPosition.row--;
            }
            break;
          case 'L':
            if (currentPosition.col > 0 && numpad[currentPosition.row][currentPosition.col - 1] !== EMPTY) {
              currentPosition.col--;
            }
            break;
          case 'R':
            if (currentPosition.col < 4 && numpad[currentPosition.row][currentPosition.col + 1] !== EMPTY) {
              currentPosition.col++;
            }
            break;
          case 'D':
            if (currentPosition.row < 4 && numpad[currentPosition.row + 1][currentPosition.col] !== EMPTY) {
              currentPosition.row++;
            }
        }
      }

      result += numpad[currentPosition.row][currentPosition.col];
    }

    return result;
  }

  protected parseInput(textInput: string): Move[][] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => line.split('') as Move[]);
  }
}
