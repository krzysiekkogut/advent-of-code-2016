import BaseSolver from './BaseSolver';

export default class Solver5 extends BaseSolver<string> {
  protected filePath: string = '5.txt';

  protected solvePart1(input: string): string {
    return this.reducePolymer(input).length.toString();
  }

  protected solvePart2(input: string): string {
    let minPolymerLength = Infinity;
    for (let char = 'a'.charCodeAt(0); char <= 'z'.charCodeAt(0); char++) {
      const regExp = new RegExp(String.fromCharCode(char), 'ig');
      const polymerLength = this.reducePolymer(input.replace(regExp, '')).length;
      minPolymerLength = Math.min(polymerLength, minPolymerLength);
    }

    return minPolymerLength.toString();
  }

  protected parseInput(textInput: string): string {
    return textInput.trim();
  }

  private reducePolymer(polymer: string) {
    let prev = polymer.slice();
    let current = polymer.slice();
    do {
      prev = current;
      current = prev.replace(
        // tslint:disable-next-line:max-line-length
        /Aa|Bb|Cc|Dd|Ee|Ff|Gg|Hh|Ii|Jj|Kk|Ll|Mm|Nn|Oo|Pp|Qq|Rr|Ss|Tt|Uu|Vv|Ww|Xx|Yy|Zz|aA|bB|cC|dD|eE|fF|gG|hH|iI|jJ|kK|lL|mM|nN|oO|pP|qQ|rR|sS|tT|uU|vV|wW|xX|yY|zZ/g,
        ''
      );
    } while (current !== prev);
    return current;
  }
}
