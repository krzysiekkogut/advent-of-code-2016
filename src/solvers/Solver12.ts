import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver12 extends BaseSolver<{ initialState: string[]; rules: Map<string, string> }> {
  protected filePath: string = '12.txt';

  protected solvePart1({ initialState, rules }: { initialState: string[]; rules: Map<string, string> }): string {
    const GENERATIONS = 20;
    const OFFSET = 1000;

    let currentState = new Array(OFFSET)
      .fill('.')
      .concat(initialState)
      .concat(new Array(OFFSET).fill('.'));
    for (let g = 0; g < GENERATIONS; g++) {
      currentState = this.nextGeneration(currentState, rules);
    }

    return this.sumPots(currentState, OFFSET).toString();
  }

  protected solvePart2({ initialState, rules }: { initialState: string[]; rules: Map<string, string> }): string {
    const GENERATIONS = 50000000000;
    const OFFSET = 1000;

    let prevState: string[] = [];
    let currentState: string[] = new Array(OFFSET)
      .fill('.')
      .concat(initialState)
      .concat(new Array(OFFSET).fill('.'));
    let g = 0;
    for (g = 0; g < GENERATIONS && this.shorten(prevState) !== this.shorten(currentState); g++) {
      prevState = currentState.slice();
      currentState = this.nextGeneration(currentState, rules);
    }

    const sum = this.sumPots(currentState, OFFSET);
    const count = currentState.filter(p => p === '#').length;
    const result = sum + (GENERATIONS - g) * count;

    return result.toString();
  }

  protected parseInput(textInput: string): { initialState: string[]; rules: Map<string, string> } {
    const lines = textInput.split(EOL);
    const [_, initialState] = lines[0].match(/initial state: ([#\.]+)/)!;
    const rules = new Map<string, string>();
    lines.slice(2).forEach(line => {
      const [__, state, result] = line.match(/([#\.]+) => (#|\.)/)!;
      rules.set(state, result);
    });

    return { initialState: initialState.split(''), rules };
  }

  private nextGeneration(pots: string[], rules: Map<string, string>): string[] {
    const nextState = pots.slice();

    for (let i = 0; i <= pots.length - 5; i++) {
      const fragment = pots.slice(i, i + 5);
      const newPlantState = rules.get(fragment.join(''));
      if (newPlantState) {
        nextState[i + 2] = newPlantState;
      }
    }

    return nextState;
  }

  private sumPots(pots: string[], offset: number): number {
    let result = 0;
    for (let i = 0; i < pots.length; i++) {
      if (pots[i] === '#') {
        result += i;
        result -= offset;
      }
    }

    return result;
  }

  private shorten(pots: string[]): string {
    const index = pots.indexOf('#');
    const lastIndex = pots.lastIndexOf('#');
    return pots.slice(index, lastIndex + 1).join('');
  }
}
