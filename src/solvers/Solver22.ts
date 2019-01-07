import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IRegion {
  y: number;
  x: number;
  geologicIndex: number;
  erosionLevel: number;
  riskLevel: number;
}

interface INode {
  y: number;
  x: number;
  distance: number;
  tool: number;
}

const NONE = 0;
const TORCH = 1;
const CLIMBING_GEAR = 2;

const ROCKY = 0;
const WET = 1;
const NARROW = 2;

export default class Solver22 extends BaseSolver<{ depth: number; targetX: number; targetY: number }> {
  protected filePath = '22.txt';

  protected solvePart1({ depth, targetX, targetY }: { depth: number; targetX: number; targetY: number }): string {
    const caveSystem = this.createMap(depth, targetX, targetY);
    let riskLevel = 0;
    for (let y = 0; y <= targetY; y++) {
      for (let x = 0; x <= targetX; x++) {
        riskLevel += caveSystem[y][x].riskLevel;
      }
    }

    return riskLevel.toString();
  }

  protected solvePart2({ depth, targetX, targetY }: { depth: number; targetX: number; targetY: number }): string {
    const caveSystem = this.createMap(depth, targetX, targetY);
    const graph: INode[][][] = new Array(targetY * 2 + 1);
    for (let y = 0; y < graph.length; y++) {
      graph[y] = new Array(targetX * 2 + 1);
      for (let x = 0; x < graph[y].length; x++) {
        graph[y][x] = new Array(3);
        for (let tool = 0; tool < 3; tool++) {
          graph[y][x][tool] = { y, x, distance: Infinity, tool };
        }
      }
    }

    graph[0][0][TORCH].distance = 0;
    const queue = [graph[0][0][TORCH]];

    while (queue.length > 0) {
      const { y, x, distance, tool } = queue.shift()!;
      const possibleNextRegions = this.getPossibleSteps(caveSystem, y, x);

      // TODO: DO NOT CHANGE IN PLACE AS NO OPTIONS ARE AVAILABLE ANE IT CAN ELIMINATE VALID PATHS
      // Change equipment in place
      switch (caveSystem[y][x].riskLevel) {
        case ROCKY:
          if (tool !== TORCH && distance + 7 < graph[y][x][TORCH].distance) {
            graph[y][x][TORCH].distance = distance + 7;
            queue.push(graph[y][x][TORCH]);
          }

          if (tool !== CLIMBING_GEAR && distance + 7 < graph[y][x][CLIMBING_GEAR].distance) {
            graph[y][x][CLIMBING_GEAR].distance = distance + 7;
            queue.push(graph[y][x][CLIMBING_GEAR]);
          }

          break;
        case WET:
          if (tool !== CLIMBING_GEAR && distance + 7 < graph[y][x][CLIMBING_GEAR].distance) {
            graph[y][x][CLIMBING_GEAR].distance = distance + 7;
            queue.push(graph[y][x][CLIMBING_GEAR]);
          }

          if (tool !== NONE && distance + 7 < graph[y][x][NONE].distance) {
            graph[y][x][NONE].distance = distance + 7;
            queue.push(graph[y][x][NONE]);
          }

          break;
        case NARROW:
          if (tool !== TORCH && distance + 7 < graph[y][x][TORCH].distance) {
            graph[y][x][TORCH].distance = distance + 7;
            queue.push(graph[y][x][TORCH]);
          }

          if (tool !== NONE && distance + 7 < graph[y][x][NONE].distance) {
            graph[y][x][NONE].distance = distance + 7;
            queue.push(graph[y][x][NONE]);
          }

          break;
      }

      // Move
      for (const region of possibleNextRegions) {
        const torchOption = graph[region.y][region.x][TORCH];
        const climbingGearOption = graph[region.y][region.x][CLIMBING_GEAR];
        const noneOption = graph[region.y][region.x][NONE];
        switch (region.riskLevel) {
          case ROCKY: // rocky - torch or gear
            switch (tool) {
              case TORCH:
                if (distance + 1 < torchOption.distance) {
                  torchOption.distance = distance + 1;
                  queue.push(torchOption);
                }

                break;
              case CLIMBING_GEAR:
                if (distance + 1 < climbingGearOption.distance) {
                  climbingGearOption.distance = distance + 1;
                  queue.push(climbingGearOption);
                }

                break;
            }
            break;
          case WET: // wet - gear or none
            switch (tool) {
              case CLIMBING_GEAR:
                if (distance + 1 < climbingGearOption.distance) {
                  climbingGearOption.distance = distance + 1;
                  queue.push(climbingGearOption);
                }

                break;
              case NONE:
                if (distance + 1 < noneOption.distance) {
                  noneOption.distance = distance + 1;
                  queue.push(noneOption);
                }

                break;
            }
            break;
          case NARROW: // narrow - torch or none
            switch (tool) {
              case TORCH:
                if (distance + 1 < torchOption.distance) {
                  torchOption.distance = distance + 1;
                  queue.push(torchOption);
                }

                break;
              case NONE:
                if (distance + 1 < noneOption.distance) {
                  noneOption.distance = distance + 1;
                  queue.push(noneOption);
                }

                break;
            }
            break;
        }
      }
    }

    return graph[targetY][targetX]
      .map(toolDist => toolDist.distance + (toolDist.tool === TORCH ? 0 : 7))
      .reduce((prev, curr) => Math.min(prev, curr), Infinity)
      .toString();
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

  private createMap(depth: number, targetX: number, targetY: number): IRegion[][] {
    const caveSystem: IRegion[][] = new Array(targetY * 2 + 1);
    for (let i = 0; i < caveSystem.length; i++) {
      caveSystem[i] = new Array(targetX * 2 + 1);
    }

    for (let y = 0; y < caveSystem.length; y++) {
      for (let x = 0; x < caveSystem[y].length; x++) {
        if ((x === 0 && y === 0) || (x === targetX && y === targetY)) {
          const geologicIndex = 0;
          const { erosionLevel, riskLevel } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { y, x, geologicIndex, erosionLevel, riskLevel };
        } else if (y === 0) {
          const geologicIndex = x * 16807;
          const { erosionLevel, riskLevel } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { y, x, geologicIndex, erosionLevel, riskLevel };
        } else if (x === 0) {
          const geologicIndex = y * 48271;
          const { erosionLevel, riskLevel } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { y, x, geologicIndex, erosionLevel, riskLevel };
        } else {
          const geologicIndex = caveSystem[y][x - 1].erosionLevel * caveSystem[y - 1][x].erosionLevel;
          const { erosionLevel, riskLevel } = this.getErosionLevelAndType(geologicIndex, depth);
          caveSystem[y][x] = { y, x, geologicIndex, erosionLevel, riskLevel };
        }
      }
    }

    return caveSystem;
  }

  private getErosionLevelAndType(geologicIndex: number, depth: number): { erosionLevel: number; riskLevel: number } {
    const erosionLevel = (geologicIndex + depth) % 20183;
    const riskLevel = erosionLevel % 3;
    return {
      erosionLevel,
      riskLevel,
    };
  }

  private getPossibleSteps(caveSystem: IRegion[][], y: number, x: number): IRegion[] {
    const steps: IRegion[] = [];

    // top
    if (y - 1 >= 0) {
      steps.push(caveSystem[y - 1][x]);
    }

    // left
    if (x - 1 >= 0) {
      steps.push(caveSystem[y][x - 1]);
    }

    // right
    if (x + 1 < caveSystem[y].length) {
      steps.push(caveSystem[y][x + 1]);
    }

    // bottom
    if (y + 1 < caveSystem.length) {
      steps.push(caveSystem[y + 1][x]);
    }

    return steps;
  }
}
