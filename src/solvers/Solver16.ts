import { EOL } from 'os';
import Operation from './16/Operation';
import BaseSolver from './BaseSolver';

import Addi from './16/Addi';
import Addr from './16/Addr';
import Bani from './16/Bani';
import Banr from './16/Banr';
import Bori from './16/Bori';
import Borr from './16/Borr';
import Eqir from './16/Eqir';
import Eqri from './16/Eqri';
import Eqrr from './16/Eqrr';
import Gtir from './16/Gtir';
import Gtri from './16/Gtri';
import Gtrr from './16/Gtrr';
import Muli from './16/Muli';
import Mulr from './16/Mulr';
import Seti from './16/Seti';
import Setr from './16/Setr';

interface ISample {
  after: number[];
  before: number[];
  instructrion: number[];
}

export default class Solver16 extends BaseSolver<{ samples: ISample[] }> {
  protected filePath = '16.txt';

  protected solvePart1({ samples }: { samples: ISample[] }): string {
    const operations = this.getAllOperations();
    let samplesWithAtLeast3MatchesCount = 0;
    samples.forEach(sample => {
      let matchingCount = 0;
      operations.forEach(operation => {
        const result = operation.calc(
          sample.before,
          sample.instructrion[1],
          sample.instructrion[2],
          sample.instructrion[3]
        );
        if (this.match(result, sample.after)) {
          matchingCount++;
        }
      });

      samplesWithAtLeast3MatchesCount += matchingCount >= 3 ? 1 : 0;
    });

    return samplesWithAtLeast3MatchesCount.toString();
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
          .match(/Before:\s+\[([-\d,\s]+)\]/)![1]
          .split(',')
          .map(n => parseInt(n.trim(), 10)),
        // tslint:disable-next-line:object-literal-sort-keys
        instructrion: lines[i + 1].split(' ').map(n => parseInt(n.trim(), 10)),
        // tslint:disable-next-line:object-literal-sort-keys
        after: lines[i + 2]
          .match(/After:\s+\[([-\d,\s]+)\]/)![1]
          .split(',')
          .map(n => parseInt(n.trim(), 10)),
      });
    }
    return samples;
  }

  private getAllOperations(): Operation[] {
    return [
      new Addr(),
      new Addi(),
      new Mulr(),
      new Muli(),
      new Banr(),
      new Bani(),
      new Borr(),
      new Bori(),
      new Setr(),
      new Seti(),
      new Gtir(),
      new Gtri(),
      new Gtrr(),
      new Eqir(),
      new Eqri(),
      new Eqrr(),
    ];
  }

  private match(registersA: number[], registersB: number[]): boolean {
    return registersA.every((registerA, index) => registerA === registersB[index]);
  }
}
