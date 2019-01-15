import RotateLeftInstruction from './RotateLeftInstruction';
import ScrambleInstruction from './ScrambleInstruction';

export default class RotateRightInstruction extends ScrambleInstruction {
  private steps: number;

  constructor(line: string, steps?: number) {
    super();
    this.steps = steps !== undefined ? steps : parseInt(line.match(/(\d+)/g)![0]);
  }

  /**
   * rotate left/right X steps means that the whole string should be rotated;
   * for example, one right rotation would turn abcd into dabc.
   */
  public scramble(input: string[]): string[] {
    for (let i = 0; i < this.steps; i++) {
      input.unshift(input.pop()!);
    }
    return input;
  }

  public unscramble(input: string[]): string[] {
    return new RotateLeftInstruction('', this.steps).scramble(input);
  }
}
