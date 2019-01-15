import ScrambleInstruction from './ScrambleInstruction';

export default class SwapLetterInstruction extends ScrambleInstruction {
  private letterX: string;
  private letterY: string;

  constructor(line: string) {
    super();
    const [x, y] = line.match(/swap letter (\w) with letter (\w)/)!.slice(1);
    this.letterX = x;
    this.letterY = y;
  }

  /**
   * swap letter X with letter Y means that the letters X and Y should be swapped
   * (regardless of where they appear in the string).
   */
  public scramble(input: string[]): string[] {
    const indexX = input.indexOf(this.letterX);
    const indexY = input.indexOf(this.letterY);
    input[indexX] = this.letterY;
    input[indexY] = this.letterX;
    return input;
  }

  public unscramble(input: string[]): string[] {
    return this.scramble(input);
  }
}
