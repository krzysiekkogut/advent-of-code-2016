import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver06 extends BaseSolver<string[], string> {
  protected filePath = '6.txt';

  protected solvePart1(messages: string[]): string {
    return this.createMessage(messages);
  }

  protected solvePart2(messages: string[]): string {
    return this.createMessage(messages, true);
  }

  protected parseInput(textInput: string): string[] {
    return textInput.split(EOL).filter(l => !!l);
  }

  private createMessage(messages: string[], leastCommonLetter = false): string {
    let correctMessage = '';
    for (let index = 0; index < messages[0].length; index++) {
      const map = new Map<string, number>();
      for (const message of messages) {
        map.set(message[index], (map.get(message[index]) || 0) + 1);
      }

      correctMessage += Array.from(map.entries())
        .map(e => ({ letter: e[0], count: e[1] }))
        .sort((a, b) => (a.count - b.count) * (leastCommonLetter ? 1 : -1))
        .shift()!.letter;
    }

    return correctMessage;
  }
}
