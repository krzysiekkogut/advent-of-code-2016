import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface ISample {
  after: number[];
  before: number[];
  instructrion: number[];
}

export default class Solver16 extends BaseSolver<{ samples: ISample[] }> {
  protected filePath = '16.txt';

  protected solvePart1(input: { samples: ISample[] }): string {
    throw new Error('Method not implemented.');
  }
  protected solvePart2(input: { samples: ISample[] }): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): { samples: ISample[] } {
    const lines = textInput
      .split(EOL)
      .map(l => l.trim())
      .filter(l => !!l);
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      if (line.startsWith('After')) {
        return {
          samples: this.parseSamples(lines.slice(0, i + 1)),
          // others: this.parseOthers(lines.slice(i + 1))
        };
      }
    }

    throw new Error('Incorrect input');
  }

  private parseSamples(lines: string[]): ISample[] {
    const samples: ISample[] = [];
    for (let i = 0; i < lines.length - 2; i += 3) {
      samples.push({
        before: lines[i]
          .match(/Before: \[([-\d,\s]+)\]/)![1]
          .split(',')
          .map(n => parseInt(n.trim(), 10)),
        // tslint:disable-next-line:object-literal-sort-keys
        instructrion: lines[i + 1].split(' ').map(n => parseInt(n.trim(), 10)),
        // tslint:disable-next-line:object-literal-sort-keys
        after: lines[i + 2]
          .match(/After: \[([-\d,\s]+)\]/)![1]
          .split(',')
          .map(n => parseInt(n.trim(), 10)),
      });
    }
    return samples;
  }
}
