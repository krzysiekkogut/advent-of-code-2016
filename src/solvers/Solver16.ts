import { EOL } from 'os';
import BaseSolver from './BaseSolver';
import Operation from './DeviceProcessor/Operation';

import Addi from './DeviceProcessor/Addi';
import Addr from './DeviceProcessor/Addr';
import Bani from './DeviceProcessor/Bani';
import Banr from './DeviceProcessor/Banr';
import Bori from './DeviceProcessor/Bori';
import Borr from './DeviceProcessor/Borr';
import Eqir from './DeviceProcessor/Eqir';
import Eqri from './DeviceProcessor/Eqri';
import Eqrr from './DeviceProcessor/Eqrr';
import Gtir from './DeviceProcessor/Gtir';
import Gtri from './DeviceProcessor/Gtri';
import Gtrr from './DeviceProcessor/Gtrr';
import Muli from './DeviceProcessor/Muli';
import Mulr from './DeviceProcessor/Mulr';
import Seti from './DeviceProcessor/Seti';
import Setr from './DeviceProcessor/Setr';

interface ISample {
  after: number[];
  before: number[];
  instructrion: number[];
}

export default class Solver16 extends BaseSolver<{ instructrions: number[][]; samples: ISample[] }> {
  protected filePath = '16.txt';

  protected solvePart1({ samples }: { instructrions: number[][]; samples: ISample[] }): number {
    const samplesMap = this.getMatchingOperations(samples);
    return Array.from(samplesMap.values())
      .map(ops => (ops.length >= 3 ? 1 : (0 as number)))
      .reduce((prev, curr) => prev + curr, 0);
  }

  protected solvePart2({ instructrions, samples }: { instructrions: number[][]; samples: ISample[] }): number {
    const samplesMap = this.getMatchingOperations(samples);
    const opCodes: Array<Set<string>> = new Array(16);
    for (let i = 0; i < opCodes.length; i++) {
      opCodes[i] = new Set<string>();
    }

    samplesMap.forEach((ops, sample) => {
      const opCode = sample.instructrion[0];
      ops.forEach(op => opCodes[opCode].add(op));
    });

    const processed = new Set<string>();
    while (opCodes.some(s => s.size > 1)) {
      const set1Index = opCodes.findIndex((s, i) => s.size === 1 && !processed.has(Array.from(opCodes[i].values())[0]));
      const set1Item = Array.from(opCodes[set1Index].values())[0];
      for (let i = 0; i < opCodes.length; i++) {
        if (i !== set1Index) {
          opCodes[i].delete(set1Item);
        }
      }
      processed.add(set1Item);
    }

    const operations: Operation[] = opCodes.map(s => {
      const opName = Array.from(s.values())[0];
      switch (opName) {
        case 'Addi':
          return new Addi();
        case 'Addr':
          return new Addr();
        case 'Bani':
          return new Bani();
        case 'Banr':
          return new Banr();
        case 'Bori':
          return new Bori();
        case 'Borr':
          return new Borr();
        case 'Eqir':
          return new Eqir();
        case 'Eqri':
          return new Eqri();
        case 'Eqrr':
          return new Eqrr();
        case 'Gtir':
          return new Gtir();
        case 'Gtri':
          return new Gtri();
        case 'Gtrr':
          return new Gtrr();
        case 'Muli':
          return new Muli();
        case 'Mulr':
          return new Mulr();
        case 'Seti':
          return new Seti();
        case 'Setr':
          return new Setr();
        default:
          throw new Error('Incorrect input.');
      }
    });

    let registers = [0, 0, 0, 0];
    registers = this.runProgram(registers, instructrions, operations);

    return registers[0];
  }

  protected parseInput(textInput: string): { instructrions: number[][]; samples: ISample[] } {
    const lines = textInput
      .split(EOL)
      .map(l => l.trim())
      .filter(l => !!l);
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      if (line.startsWith('After')) {
        return {
          instructrions: this.parseInstructrions(lines.slice(i + 1)),
          samples: this.parseSamples(lines.slice(0, i + 1)),
        };
      }
    }

    throw new Error('Incorrect input');
  }

  private parseSamples(lines: string[]): ISample[] {
    const samples: ISample[] = [];
    for (let i = 0; i < lines.length - 2; i += 3) {
      samples.push({
        after: lines[i + 2]
          .match(/After:\s+\[([-\d,\s]+)\]/)![1]
          .split(',')
          .map(n => parseInt(n.trim())),
        before: lines[i]
          .match(/Before:\s+\[([-\d,\s]+)\]/)![1]
          .split(',')
          .map(n => parseInt(n.trim())),
        instructrion: lines[i + 1].split(' ').map(n => parseInt(n.trim())),
      });
    }
    return samples;
  }

  private parseInstructrions(lines: string[]): number[][] {
    return lines.map(line => line.split(' ').map(n => parseInt(n.trim())));
  }

  private getMatchingOperations(samples: ISample[]): Map<ISample, string[]> {
    const operations = this.getAllOperations();
    const samplesMap = new Map<ISample, string[]>();
    samples.forEach(sample => {
      const matchingOperations: string[] = [];
      operations.forEach(operation => {
        const result = operation.calc(
          sample.before,
          sample.instructrion[1],
          sample.instructrion[2],
          sample.instructrion[3]
        );

        if (this.match(result, sample.after)) {
          matchingOperations.push(operation.constructor.name);
        }
      });

      samplesMap.set(sample, matchingOperations);
    });

    return samplesMap;
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

  private runProgram(initialRegisters: number[], instructrions: number[][], operations: Operation[]): number[] {
    let registers = initialRegisters.slice();
    instructrions.forEach(instructrion => {
      registers = operations[instructrion[0]].calc(registers, instructrion[1], instructrion[2], instructrion[3]);
    });
    return registers;
  }
}
