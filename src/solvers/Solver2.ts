import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver2 extends BaseSolver<string[]> {
  protected filePath: string = '2.txt';

  protected solvePart1(input: string[]): string {
    let twos = 0;
    let threes = 0;
    input.forEach(code => {
      const { hasTwo, hasThree } = this.hasMultiple(code);
      if (hasTwo) {
        twos++;
      }

      if (hasThree) {
        threes++;
      }
    });

    return (twos * threes).toString();
  }

  protected solvePart2(input: string[]): string {
    input.sort();
    for (let i = 0; i < input.length - 1; i++) {
      const diff = this.getDiffCount(input[i], input[i + 1]);
      if (diff === 1) {
        let result = '';

        for (let j = 0; j < input[i].length; j++) {
          if (input[i][j] === input[i + 1][j]) {
            result += input[i][j];
          }
        }

        return result;
      }
    }
    return '';
  }

  protected parseInput(textInput: string): string[] {
    return textInput.split(EOL);
  }

  private hasMultiple(code: string): { hasTwo: boolean; hasThree: boolean } {
    const map = new Map<string, number>();

    for (const char of code) {
      map.set(char, (map.get(char) || 0) + 1);
    }

    return {
      hasThree: Array.from(map.values()).indexOf(3) >= 0,
      hasTwo: Array.from(map.values()).indexOf(2) >= 0,
    };
  }

  private getDiffCount(text1: string, text2: string): number {
    let diff = 0;
    for (let i = 0; i < text1.length; i++) {
      if (text1[i] !== text2[i]) {
        diff++;
      }
    }

    return diff;
  }
}
