export default abstract class ScrambleInstruction {
  public abstract scramble(input: string[]): string[];
  public abstract unscramble(input: string[]): string[];
}
