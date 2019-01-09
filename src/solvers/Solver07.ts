import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IInstruction {
  stepName: string;
  nextStep: string;
}

interface IStepInfo {
  dependentSteps: string[];
  timeNeeded: number;
  isWorkedOn: boolean;
}

export default class Solver7 extends BaseSolver<IInstruction[], string, number> {
  protected filePath: string = '7.txt';

  protected solvePart1(input: IInstruction[]): string {
    const graph = this.buildGraph(input);
    let result = '';
    while (graph.size > 0) {
      const dependantSteps = ([] as string[]).concat(
        ...Array.from(graph.values()).map(stepInfo => stepInfo.dependentSteps)
      );
      const candidates = Array.from(graph.keys()).filter(step => dependantSteps.indexOf(step) < 0);
      candidates.sort();
      result += candidates[0];
      graph.delete(candidates[0]);
    }

    return result;
  }

  protected solvePart2(input: IInstruction[]): number {
    const graph = this.buildGraph(input);
    const workers = new Map<number, string>();
    for (let i = 1; i <= 5; i++) {
      workers.set(i, '');
    }

    let second = 0;
    while (graph.size > 0) {
      // Find candidate steps to work on
      const dependantSteps = ([] as string[]).concat(
        ...Array.from(graph.values()).map(stepInfo => stepInfo.dependentSteps)
      );
      const candidates = Array.from(graph.keys()).filter(
        step => dependantSteps.indexOf(step) < 0 && !graph.get(step)!.isWorkedOn
      );
      candidates.sort();

      // Assign work
      while (!Array.from(workers.values()).every(busy => !!busy) && candidates.length > 0) {
        const freeWorker = Array.from(workers.keys()).find(k => !workers.get(k)!)!;
        const nextStep = candidates.shift()!;
        graph.get(nextStep)!.isWorkedOn = true;
        workers.set(freeWorker, nextStep);
      }

      // Finish steps and free resources
      const stepsToDelete: string[] = [];
      graph.forEach((stepInfo, stepName) => {
        if (stepInfo.isWorkedOn) {
          stepInfo.timeNeeded--;
        }

        if (stepInfo.timeNeeded === 0) {
          stepsToDelete.push(stepName);
          workers.forEach((workerStep, worker) => {
            if (workerStep === stepName) {
              workers.set(worker, '');
            }
          });
        }
      });
      stepsToDelete.forEach(step => graph.delete(step));

      // Advance time
      second++;
    }

    return second;
  }

  protected parseInput(textInput: string): Array<{ stepName: string; nextStep: string }> {
    return textInput.split(EOL).map(line => {
      const [_, stepName, nextStep] = line.match(/Step (\w) must be finished before step (\w) can begin./)!;
      return { stepName, nextStep };
    });
  }

  private buildGraph(instructions: IInstruction[]): Map<string, IStepInfo> {
    const graph = new Map<string, IStepInfo>();
    instructions.forEach(instruction => {
      graph.set(instruction.stepName, {
        dependentSteps: [],
        isWorkedOn: false,
        timeNeeded: this.calculateStepDuration(instruction.stepName),
      });
      graph.set(instruction.nextStep, {
        dependentSteps: [],
        isWorkedOn: false,
        timeNeeded: this.calculateStepDuration(instruction.nextStep),
      });
    });

    instructions.forEach(instruction => {
      const stepInfo = graph.get(instruction.stepName)!;
      stepInfo.dependentSteps.push(instruction.nextStep);
      graph.set(instruction.stepName, stepInfo);
    });

    return graph;
  }

  private calculateStepDuration(stepName: string): number {
    return 60 + stepName.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  }
}
