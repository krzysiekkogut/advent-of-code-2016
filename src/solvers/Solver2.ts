import BaseSolver from './BaseSolver';

export default class Solver2 extends BaseSolver<string[]> {
  protected filePath: string = '2.txt';

  protected solveInternal(input: string[]): string {
    let twos = 0;
    let threes = 0;
    input.forEach(code => {
      const { hasTwo, hasThree } = this.hasMultiple(code);
      if (hasTwo) {
        twos++;
      }

      if (hasThree) {
        threes++;
      }
    });

    return (twos * threes).toString();
  }

  protected parseInput(textInput: string): string[] {
    return textInput.split('\n');
  }

  private hasMultiple(code: string): { hasTwo: boolean; hasThree: boolean } {
    const map = new Map<string, number>();

    for (const char of code) {
      map.set(char, (map.get(char) || 0) + 1);
    }

    return {
      hasThree: Array.from(map.values()).indexOf(3) >= 0,
      hasTwo: Array.from(map.values()).indexOf(2) >= 0,
    };
  }
}
