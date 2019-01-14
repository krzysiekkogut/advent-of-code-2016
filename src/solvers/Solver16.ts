// tslint:disable:no-bitwise
import BaseSolver from './BaseSolver';

export default class Solver16 extends BaseSolver<string, string> {
  protected filePath = '16.txt';

  protected solvePart1(input: string): string {
    return this.calculateChecksum(input, 272);
  }

  protected solvePart2(input: string): string {
    return this.calculateChecksum(input, 35651584);
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }

  private calculateChecksum(initialData: string, diskSize: number) {
    let data = initialData.split('').map(b => parseInt(b));
    while (data.length < diskSize) {
      data = data.concat(
        [0],
        data
          .slice()
          .reverse()
          .map(b => b ^ 1)
      );
    }

    data = data.slice(0, diskSize);

    do {
      const checksum = [];
      for (let i = 0; i < data.length - 1; i += 2) {
        checksum.push(~(data[i] ^ data[i + 1]) & 1);
      }
      data = checksum;
    } while (data.length % 2 === 0);

    return data.join('');
  }
}
