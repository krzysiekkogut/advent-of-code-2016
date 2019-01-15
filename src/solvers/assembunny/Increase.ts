import Operation from './Operation';

export default class Increase extends Operation {
  public static id = 'inc';
  public id = 'inc';
  public args: string[];

  constructor(private register: string) {
    super();
    this.args = [register];
  }

  public calc(registers: number[]): number {
    if (isNaN(parseInt(this.register))) {
      registers[this.getRegisterNumber(this.register)]++;
    }
    return 1;
  }
}
