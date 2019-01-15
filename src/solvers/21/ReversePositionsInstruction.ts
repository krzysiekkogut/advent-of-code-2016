import ScrambleInstruction from './ScrambleInstruction';

export default class ReversePositionsInstruction extends ScrambleInstruction {
  private positionX: number;
  private positionY: number;

  constructor(line: string) {
    super();
    const [x, y] = line.match(/(\d+)/g)!.map(n => parseInt(n));
    this.positionX = x;
    this.positionY = y;
  }

  /**
   * reverse positions X through Y means that the span of letters at indexes X through Y
   * (including the letters at X and Y) should be reversed in order.
   */
  public scramble(input: string[]): string[] {
    return input
      .slice(0, this.positionX)
      .concat(input.slice(this.positionX, this.positionY + 1).reverse())
      .concat(input.slice(this.positionY + 1));
  }

  public unscramble(input: string[]): string[] {
    return this.scramble(input);
  }
}
