import { createHash } from 'crypto';
import BaseSolver from './BaseSolver';

export default class Solver05 extends BaseSolver<string, string> {
  protected filePath = '5.txt';

  protected solvePart1(input: string): string {
    let password = '';
    for (let index = 0; password.length < 8; index++) {
      const hash = createHash('md5')
        .update(`${input}${index}`)
        .digest('hex');
      if (hash.startsWith('00000')) {
        password += hash[5];
      }
    }

    return password;
  }

  protected solvePart2(input: string): string {
    const password = new Array<string>(8);
    for (let index = 0; password.filter(l => !!l).length < 8; index++) {
      const hash = createHash('md5')
        .update(`${input}${index}`)
        .digest('hex');
      if (hash.startsWith('00000')) {
        const position = parseInt(hash[5]);
        if (!isNaN(position) && position < 8 && !password[position]) {
          password[position] = hash[6];
        }
      }
    }

    return password.join('');
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }
}
