import BaseSolver from './BaseSolver';

export default class Solver20 extends BaseSolver<string[]> {
  protected filePath = '20.txt';

  protected solvePart1(input: string[]): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2(input: string[]): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): string[] {
    return textInput.slice(1, textInput.length - 1).split('');
  }
}
