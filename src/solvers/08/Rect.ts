import Instruction from './Instruction';

export default class Rect extends Instruction {
  public static id = 'rect';

  public width: number;
  public height: number;

  constructor(operationDescription: string) {
    super();
    const [width, height] = operationDescription.split(' ')[1].split('x');
    this.width = parseInt(width.trim());
    this.height = parseInt(height.trim());
  }

  public process(display: string[][]): void {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        display[row][col] = '#';
      }
    }
  }
}
