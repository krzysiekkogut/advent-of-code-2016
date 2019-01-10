import Action, { OutputType } from './Action';

export default class OutAction extends Action {
  constructor(
    public bot: number,
    private lowOutputType: OutputType,
    private lowOutputNumber: number,
    private highOutputType: OutputType,
    private highOutputNumber: number
  ) {
    super();
  }

  public process(state: Map<string, number[]>): void {
    const botState = state.get(`bot_${this.bot}`) || [];
    this.addTo(state, this.lowOutputType, this.lowOutputNumber, botState[0]);
    this.addTo(state, this.highOutputType, this.highOutputNumber, botState[1]);
    state.delete(`bot_${this.bot}`);
  }
}
