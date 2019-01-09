import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver03 extends BaseSolver<number[][]> {
  protected filePath = '3.txt';

  protected solvePart1(input: number[][]): number {
    return input.filter(triple => {
      triple.sort((a, b) => a - b);
      return this.isTriangle(triple);
    }).length;
  }

  protected solvePart2(input: number[][]): number {
    let count = 0;
    for (let col = 0; col < input[0].length; col++) {
      for (let row = 0; row < input.length; row += 3) {
        count += this.isTriangle([input[row][col], input[row + 1][col], input[row + 2][col]]) ? 1 : 0;
      }
    }

    return count;
  }

  protected parseInput(textInput: string): number[][] {
    const lines = textInput.split(EOL).filter(l => !!l);
    const triples = lines.map(line =>
      line
        .match(/\s*(\d+)\s*(\d+)\s*(\d+)/)!
        .slice(1)
        .map(n => parseInt(n))
    );
    return triples;
  }

  private isTriangle(array: number[]): boolean {
    const [a, b, c] = array.sort((numA, numB) => numA - numB);
    return a + b > c;
  }
}
