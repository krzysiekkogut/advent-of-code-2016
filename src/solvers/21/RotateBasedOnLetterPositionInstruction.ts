import RotateRightInstruction from './RotateRightInstruction';
import ScrambleInstruction from './ScrambleInstruction';

export default class RotateBasedOnLetterPositionInstruction extends ScrambleInstruction {
  private letter: string;

  constructor(line: string) {
    super();
    this.letter = line[line.length - 1];
  }

  /**
   * rotate based on position of letter X means that the whole string should be rotated to the right
   * based on the index of letter X (counting from 0) as determined before this instruction does any rotations.
   * Once the index is determined, rotate the string to the right one time, plus a number of times equal to that index,
   * plus one additional time if the index was at least 4.
   */
  public scramble(input: string[]): string[] {
    const index = input.indexOf(this.letter);
    return new RotateRightInstruction('', 1 + index + (index >= 4 ? 1 : 0)).scramble(input);
  }

  public unscramble(input: string[]): string[] {
    for (const test of this.getPermutations(input)) {
      if (this.scramble(test.slice()).join('') === input.join('')) {
        return test;
      }
    }

    throw new Error('Irreversible operation');
  }

  private getPermutations(array: string[]): string[][] {
    if (array.length <= 1) return [array];

    const results: string[][] = [];

    for (let i = 0; i < array.length; i++) {
      const current = array.slice();
      const head = current.splice(i, 1);
      const nextPermutations = this.getPermutations(current.slice());
      for (const permutation of nextPermutations) {
        results.push(head.concat(permutation));
      }
    }

    return results;
  }
}
