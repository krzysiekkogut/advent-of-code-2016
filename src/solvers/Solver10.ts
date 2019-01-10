import { EOL } from 'os';
import Action, { OutputType } from './10/Action';
import InAction from './10/InAction';
import OutAction from './10/OutAction';
import BaseSolver from './BaseSolver';

export default class Solver10 extends BaseSolver<{ inActions: InAction[]; outActions: OutAction[] }> {
  protected filePath = '10.txt';

  protected solvePart1({ inActions, outActions }: { inActions: InAction[]; outActions: OutAction[] }): number {
    const state = new Map<string, number[]>();
    for (const action of inActions) {
      action.process(state);
    }

    while (true) {
      for (const action of outActions) {
        const botState = state.get(`bot_${action.bot}`) || [];
        if (botState[0] === 17 && botState[1] === 61) {
          return action.bot;
        }

        if (botState.length === 2) {
          action.process(state);
        }
      }
    }
  }

  protected solvePart2({ inActions, outActions }: { inActions: InAction[]; outActions: OutAction[] }): number {
    const state = new Map<string, number[]>();
    for (const action of inActions) {
      action.process(state);
    }

    while (true) {
      for (const action of outActions) {
        const output0 = (state.get(`output_0`) || [])[0];
        const output1 = (state.get(`output_1`) || [])[0];
        const output2 = (state.get(`output_2`) || [])[0];
        if (output0 !== undefined && output1 !== undefined && output2 !== undefined) {
          return output0 * output1 * output2;
        }

        const botState = state.get(`bot_${action.bot}`) || [];
        if (botState.length === 2) {
          action.process(state);
        }
      }
    }
  }

  protected parseInput(textInput: string): { inActions: InAction[]; outActions: OutAction[] } {
    const actions = textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => {
        if (line.startsWith('bot')) {
          const [bot, lowOutputType, lowOutputNumber, highOutputType, highOutputNumber] = line
            .match(/bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)/)!
            .slice(1);
          return new OutAction(
            parseInt(bot),
            lowOutputType as OutputType,
            parseInt(lowOutputNumber),
            highOutputType as OutputType,
            parseInt(highOutputNumber)
          );
        } else {
          const [value, bot] = line
            .match(/value (\d+) goes to bot (\d+)/)!
            .slice(1)
            .map(n => parseInt(n));
          return new InAction(bot, value);
        }
      });

    return {
      inActions: actions.filter(a => a instanceof InAction) as InAction[],
      outActions: actions.filter(a => a instanceof OutAction) as OutAction[],
    };
  }
}
