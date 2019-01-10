import BaseSolver from './BaseSolver';

export default class Solver09 extends BaseSolver<string> {
  protected filePath = '9.txt';

  protected solvePart1(input: string): number {
    let result = '';

    for (let i = 0; i < input.length; i++) {
      if (input[i] === '(') {
        const startOfMarker = i + 1;
        const endOfMarker = input.indexOf(')', i);
        const [dataLength, repeat] = input
          .slice(startOfMarker, endOfMarker)
          .split('x')
          .map(n => parseInt(n));
        const dataToRepeat = input.slice(endOfMarker + 1, endOfMarker + 1 + dataLength);
        for (let t = 0; t < repeat; t++) {
          result += dataToRepeat;
        }

        i = endOfMarker + dataLength;
      } else {
        result += input[i];
      }
    }

    return result.length;
  }

  protected solvePart2(input: string): number {
    return this.findDecompressedLength(input);
  }

  protected parseInput(textInput: string): string {
    return textInput.trim();
  }

  private findDecompressedLength(text: string): number {
    let result = 0;

    for (let i = 0; i < text.length; i++) {
      if (text[i] === '(') {
        const startOfMarker = i + 1;
        const endOfMarker = text.indexOf(')', i);
        const [dataLength, repeat] = text
          .slice(startOfMarker, endOfMarker)
          .split('x')
          .map(n => parseInt(n));
        const dataToRepeat = text.slice(endOfMarker + 1, endOfMarker + 1 + dataLength);
        result += repeat * this.findDecompressedLength(dataToRepeat);
        i = endOfMarker + dataLength;
      } else {
        result++;
      }
    }

    return result;
  }
}
