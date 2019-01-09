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

interface IInstruction {
  operation: Operation;
  inputA: number;
  inputB: number;
  output: number;
}

interface IProgram {
  instructionPointerIndex: number;
  instructions: IInstruction[];
}

export default class Solver19 extends BaseSolver<IProgram> {
  protected filePath = '19.txt';

  protected solvePart1({ instructionPointerIndex, instructions }: IProgram): number {
    let registers = [0, 0, 0, 0, 0, 0];
    while (registers[instructionPointerIndex] >= 0 && registers[instructionPointerIndex] < instructions.length) {
      const { operation, inputA, inputB, output } = instructions[registers[instructionPointerIndex]];
      registers = operation.calc(registers, inputA, inputB, output);
      registers[instructionPointerIndex]++;
    }

    return registers[0];
  }

  protected solvePart2({ instructionPointerIndex, instructions }: IProgram): number {
    let registers = [1, 0, 0, 0, 0, 0];
    while (registers[instructionPointerIndex] < 34) {
      const { operation, inputA, inputB, output } = instructions[registers[instructionPointerIndex]];
      registers = operation.calc(registers, inputA, inputB, output);
      registers[instructionPointerIndex]++;
    }

    const N = registers[4];
    let sumOfFactors = 0;
    let a = 1;
    for (a = 1; a * a <= N; a++) {
      if (N % a === 0) {
        sumOfFactors += a;
        sumOfFactors += N / a;
      }
    }

    return sumOfFactors;
  }

  protected parseInput(textInput: string): IProgram {
    const lines = textInput.split(EOL);

    const instructionPointerIndex = parseInt(lines.splice(0, 1)[0].slice(-1), 10);
    const instructions: IInstruction[] = lines.map(line => {
      const [opName, inputAText, inputBText, outputText] = line.split(' ');
      const inputA = parseInt(inputAText);
      const inputB = parseInt(inputBText);
      const output = parseInt(outputText);

      let operation: Operation;
      switch (opName) {
        case 'addi':
          operation = new Addi();
          break;
        case 'addr':
          operation = new Addr();
          break;
        case 'bani':
          operation = new Bani();
          break;
        case 'banr':
          operation = new Banr();
          break;
        case 'bori':
          operation = new Bori();
          break;
        case 'borr':
          operation = new Borr();
          break;
        case 'eqir':
          operation = new Eqir();
          break;
        case 'eqri':
          operation = new Eqri();
          break;
        case 'eqrr':
          operation = new Eqrr();
          break;
        case 'gtir':
          operation = new Gtir();
          break;
        case 'gtri':
          operation = new Gtri();
          break;
        case 'gtrr':
          operation = new Gtrr();
          break;
        case 'muli':
          operation = new Muli();
          break;
        case 'mulr':
          operation = new Mulr();
          break;
        case 'seti':
          operation = new Seti();
          break;
        case 'setr':
          operation = new Setr();
          break;
        default:
          throw new Error('Incorrect input');
      }

      return {
        inputA,
        inputB,
        operation,
        output,
      } as IInstruction;
    });

    return {
      instructionPointerIndex,
      instructions,
    };
  }
}
