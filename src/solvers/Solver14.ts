import { createHash } from 'crypto';
import BaseSolver from './BaseSolver';
export default class Solver14 extends BaseSolver<string> {
  protected filePath = '14.txt';

  protected solvePart1(salt: string): number {
    return this.findThe64KeyIndex(salt, this.basicHash);
  }

  protected solvePart2(salt: string): number {
    return this.findThe64KeyIndex(salt, text => this.extendedHash(text));
  }

  protected parseInput(textInput: string): string {
    return textInput;
  }

  private getTriplet(text: string): string | null {
    for (let i = 0; i < text.length - 2; i++) {
      if (text[i] === text[i + 1] && text[i] === text[i + 2]) {
        return new Array<string>(3).fill(text[i]).join('');
      }
    }

    return null;
  }

  private findThe64KeyIndex(salt: string, hashFunction: (text: string) => string) {
    const hashes: string[] = [];
    let keysCount = 0;
    let index = 0;
    while (keysCount < 64) {
      hashes[index] = hashes[index] || hashFunction(`${salt}${index}`);
      const triplet = this.getTriplet(hashes[index]);
      if (triplet) {
        const fivelet = new Array<string>(5).fill(triplet[0]).join('');
        for (let i = 1; i <= 1000; i++) {
          hashes[index + i] = hashes[index + i] || hashFunction(`${salt}${index + i}`);
          if (hashes[index + i].indexOf(fivelet) >= 0) {
            keysCount++;
            break;
          }
        }
      }

      index++;
    }

    return index - 1;
  }

  private basicHash(text: string): string {
    return createHash('md5')
      .update(text)
      .digest('hex');
  }

  private extendedHash(text: string): string {
    let hash = this.basicHash(text);
    for (let i = 0; i < 2016; i++) {
      hash = this.basicHash(hash);
    }
    return hash;
  }
}
