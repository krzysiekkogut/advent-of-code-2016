import ScrambleInstruction from './ScrambleInstruction';

export default class MovePositionInstruction extends ScrambleInstruction {
  private positionX: number;
  private positionY: number;

  constructor(line: string) {
    super();
    const [x, y] = line.match(/(\d+)/g)!.map(n => parseInt(n));
    this.positionX = x;
    this.positionY = y;
  }

  /**
   * move position X to position Y means that the letter which is at index X
   * should be removed from the string, then inserted such that it ends up at index Y.
   */
  public scramble(input: string[]): string[] {
    const removedItem = input.splice(this.positionX, 1);
    return input
      .slice(0, this.positionY)
      .concat(removedItem)
      .concat(input.slice(this.positionY));
  }

  public unscramble(input: string[]): string[] {
    const removedItem = input.splice(this.positionY, 1);
    return input
      .slice(0, this.positionX)
      .concat(removedItem)
      .concat(input.slice(this.positionX));
  }
}
