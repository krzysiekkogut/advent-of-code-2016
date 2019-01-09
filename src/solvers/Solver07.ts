import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver07 extends BaseSolver<string[][]> {
  protected filePath = '7.txt';

  protected solvePart1(addresses: string[][]): number {
    return addresses
      .map(address =>
        address.map(segment => ({
          hasAbba: this.hasABBA(segment),
          isHypernet: this.isHypernet(segment),
        }))
      )
      .filter(segmentsInfo => segmentsInfo.some(s => s.hasAbba) && segmentsInfo.every(s => !s.isHypernet || !s.hasAbba))
      .length;
  }

  protected solvePart2(addresses: string[][]): number {
    return addresses
      .map(address => ({
        hypernets: address.filter(segment => this.isHypernet(segment)),
        supernets: address.filter(segment => !this.isHypernet(segment)),
      }))
      .filter(addressInfo => {
        const abas = addressInfo.supernets
          .map(segment => this.getAbas(segment))
          .reduce((prev, curr) => prev.concat(curr), []);
        return addressInfo.hypernets.some(segment => abas.some(aba => segment.indexOf(aba) >= 0));
      }).length;
  }

  protected parseInput(textInput: string): string[][] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => line.match(/(\[(\w+)\])|(\w+)/g)!.slice());
  }

  private isHypernet(segment: string): boolean {
    return segment.startsWith('[');
  }

  private hasABBA(segment: string): boolean {
    const testValue = this.isHypernet(segment) ? segment.slice(1, segment.length - 1) : segment;
    for (let i = 0; i <= testValue.length - 4; i++) {
      if (
        testValue[i] !== testValue[i + 1] &&
        testValue[i] === testValue[i + 3] &&
        testValue[i + 1] === testValue[i + 2]
      ) {
        return true;
      }
    }

    return false;
  }

  private getAbas(segment: string): string[] {
    const result: string[] = [];

    for (let i = 0; i <= segment.length - 3; i++) {
      if (segment[i] === segment[i + 2] && segment[i] !== segment[i + 1]) {
        result.push(`${segment[i + 1]}${segment[i]}${segment[i + 1]}`);
      }
    }

    return result;
  }
}
