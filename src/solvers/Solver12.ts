import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IRule {
  state: string;
  result: string;
}

export default class Solver12 extends BaseSolver<{ initialState: string; rules: IRule[] }> {
  protected filePath: string = '12.txt';

  protected solvePart1(input: { initialState: string; rules: IRule[] }): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2(input: { initialState: string; rules: IRule[] }): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): { initialState: string; rules: IRule[] } {
    const lines = textInput.split(EOL);
    const [_, initialState] = lines[0].match(/initial state: ([#\.]+)/)!;
    const rules: IRule[] = lines.slice(2).map(line => {
      const [__, state, result] = line.match(/([#\.]+) => (#|\.)/)!;
      return { result, state };
    });

    return { initialState, rules };
  }
}
