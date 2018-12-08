import BaseSolver from './BaseSolver';

export default class Solver8 extends BaseSolver<number[]> {
  protected filePath: string = '8.txt';

  protected solvePart1(input: number[]): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2(input: number[]): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): number[] {
    return textInput.split(' ').map(t => parseInt(t.trim(), 10));
  }
}
