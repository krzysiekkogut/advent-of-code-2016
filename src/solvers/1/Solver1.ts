import BaseSolver from '../BaseSolver';

class Solver1 extends BaseSolver<string[]> {
  protected filePath: string = '1.txt';

  protected solveInternal(input: string[]): string {
    return input.join(' ');
  }

  protected parseInput(textInput: string): string[] {
    return textInput.split(',');
  }
}

export default Solver1;
