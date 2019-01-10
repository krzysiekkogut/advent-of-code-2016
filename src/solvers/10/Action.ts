export type OutputType = 'bot' | 'output';

export default abstract class Action {
  public abstract bot: number;
  public abstract process(state: Map<string, number[]>): void;

  protected addTo(state: Map<string, number[]>, outputType: OutputType, outputNumber: number, value: number): void {
    const hash = `${outputType}_${outputNumber}`;
    state.set(hash, (state.get(hash) || []).concat(value).sort((a, b) => a - b));
  }
}
