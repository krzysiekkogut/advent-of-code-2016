import PuzzleVariant from '../PuzzleVariant';
import BaseSolver from './BaseSolver';

class Solver1 extends BaseSolver<number[]> {
  protected filePath: string = '1.txt';

  protected solveInternal(input: number[]): string {
    if (this.variant === PuzzleVariant.PART_1) {
      return input.reduce((prev, curr) => prev + curr, 0).toString();
    }

    let i = 0;
    let currentFreq = 0;
    const frequencies = new Map<number, boolean>([[currentFreq, true]]);
    while (true) {
      currentFreq += input[i];
      if (frequencies.get(currentFreq)) {
        return currentFreq.toString();
      }

      frequencies.set(currentFreq, true);
      i = (i + 1) % input.length;
    }
  }

  protected parseInput(textInput: string): number[] {
    return textInput.split('\n').map(x => parseInt(x, 10));
  }
}

export default Solver1;
