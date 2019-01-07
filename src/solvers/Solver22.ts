import { EOL } from 'os';
import BaseSolver from './BaseSolver';

export default class Solver22 extends BaseSolver<{ depth: number; targetX: number; targetY: number }> {
  protected filePath = '22.txt';

  protected solvePart1({ depth, targetX, targetY }: { depth: number; targetX: number; targetY: number }): string {
    const caveSystem: Array<Array<{ geologicIndex: number; erosionLevel: number; type: number }>> = new Array(
      targetY + 1
    );
    for (let i = 0; i < caveSystem.length; i++) {
      caveSystem[i] = new Array(targetX + 1);
    }

    let riskLevel = 0;

    for (let y = 0; y < caveSystem.length; y++) {
      for (let x = 0; x < caveSystem[y].length; x++) {
        if ((x === 0 && y === 0) || (x === targetX && y === targetY)) {
          const geologicIndex = 0;
          const { erosionLevel, type } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { geologicIndex, erosionLevel, type };
          riskLevel += type;
        } else if (y === 0) {
          const geologicIndex = x * 16807;
          const { erosionLevel, type } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { geologicIndex, erosionLevel, type };
          riskLevel += type;
        } else if (x === 0) {
          const geologicIndex = y * 48271;
          const { erosionLevel, type } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { geologicIndex, erosionLevel, type };
          riskLevel += type;
        } else {
          const geologicIndex = caveSystem[y][x - 1].erosionLevel * caveSystem[y - 1][x].erosionLevel;
          const { erosionLevel, type } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { geologicIndex, erosionLevel, type };
          riskLevel += type;
        }
      }
    }

    return riskLevel.toString();
  }

  protected solvePart2(input: { depth: number; targetX: number; targetY: number }): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): { depth: number; targetX: number; targetY: number } {
    let depth: number;
    let targetX: number;
    let targetY: number;

    textInput.split(EOL).forEach((line, lineIndex) => {
      if (lineIndex === 0) {
        depth = parseInt(
          line
            .split(' ')
            .pop()!
            .trim(),
          10
        );
      } else if (lineIndex === 1) {
        line
          .split(' ')
          .pop()!
          .trim()
          .split(',')
          .forEach((coord, coordIndex) => {
            if (coordIndex === 0) {
              targetX = parseInt(coord, 10);
            } else {
              targetY = parseInt(coord, 10);
            }
          });
      }
    });

    return {
      depth: depth!,
      targetX: targetX!,
      targetY: targetY!,
    };
  }

  private getErosionLevelAndType(geologicIndex: number, depth: number): { erosionLevel: number; type: number } {
    const erosionLevel = (geologicIndex + depth) % 20183;
    const type = erosionLevel % 3;
    return {
      erosionLevel,
      type,
    };
  }
}
