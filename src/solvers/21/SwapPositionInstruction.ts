import ScrambleInstruction from './ScrambleInstruction';

export default class SwapPositionInstruction extends ScrambleInstruction {
  private positionX: number;
  private positionY: number;

  constructor(line: string) {
    super();
    const [x, y] = line.match(/(\d+)/g)!.map(n => parseInt(n));
    this.positionX = x;
    this.positionY = y;
  }

  /**
   * swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
   */
  public scramble(input: string[]): string[] {
    const valueX = input[this.positionX];
    input[this.positionX] = input[this.positionY];
    input[this.positionY] = valueX;
    return input;
  }

  public unscramble(input: string[]): string[] {
    return this.scramble(input);
  }
}
