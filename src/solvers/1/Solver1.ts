import BaseSolver from '../BaseSolver';

class Solver1 extends BaseSolver<string[]> {
  filePath: string = '1.txt';

  solveInternal(input: string[]): string {
    return input.join(' ');
  }

  parseInput(textInput: string): string[] {
    return textInput.split(',');
  }
}

export default Solver1;
