import Action from './Action';

export default class InAction extends Action {
  constructor(public bot: number, private value: number) {
    super();
  }

  public process(state: Map<string, number[]>): void {
    this.addTo(state, 'bot', this.bot, this.value);
  }
}
