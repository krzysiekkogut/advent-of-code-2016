import { EOL } from 'os';
import PriorityQueue from './22/PriorityQueue';
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

const TORCH = 0;
const NONE = 1;
const CLIMBING_GEAR = 2;

const ROCKY = 0;
const WET = 1;
const NARROW = 2;

export default class Solver22 extends BaseSolver<{ depth: number; targetX: number; targetY: number }> {
  protected filePath = '22.txt';

  protected solvePart1({ depth, targetX, targetY }: { depth: number; targetX: number; targetY: number }): number {
    const caveSystem = this.createMap(depth, targetX, targetY);
    let riskLevel = 0;
    for (let y = 0; y <= targetY; y++) {
      for (let x = 0; x <= targetX; x++) {
        riskLevel += caveSystem[y][x].riskLevel;
      }
    }

    return riskLevel;
  }

  protected solvePart2({ depth, targetX, targetY }: { depth: number; targetX: number; targetY: number }): number {
    const caveSystem = this.createMap(depth, targetX, targetY);
    const queue = new PriorityQueue<INode>(node => node.distance);
    const graph: INode[][][] = new Array(caveSystem.length);
    for (let y = graph.length - 1; y >= 0; y--) {
      graph[y] = new Array(caveSystem[0].length);
      for (let x = graph[y].length - 1; x >= 0; x--) {
        graph[y][x] = new Array(3);
        for (let tool = 0; tool < 3; tool++) {
          if (
            (tool === NONE && caveSystem[y][x].riskLevel === ROCKY) ||
            (tool === TORCH && caveSystem[y][x].riskLevel === WET) ||
            (tool === CLIMBING_GEAR && caveSystem[y][x].riskLevel === NARROW)
          ) {
            continue;
          }
          graph[y][x][tool] = { y, x, distance: 100000, tool };
          queue.queue(graph[y][x][tool]);
        }
      }
    }

    graph[0][0][TORCH].distance = 0;
    while (!queue.isEmpty()) {
      const { y, x, distance, tool } = queue.dequeue();
      const possibleNextRegions = this.getPossibleSteps(caveSystem, y, x);

      // only allow for tools that are OK in source and target
      for (const region of possibleNextRegions) {
        const torchOption = graph[region.y][region.x][TORCH];
        const climbingGearOption = graph[region.y][region.x][CLIMBING_GEAR];
        const noneOption = graph[region.y][region.x][NONE];
        switch (region.riskLevel) {
          case ROCKY:
            // torch
            if (caveSystem[y][x].riskLevel !== WET) {
              if (tool === TORCH && distance + 1 < torchOption.distance) {
                torchOption.distance = distance + 1;
                queue.changePriority(torchOption);
              } else if (tool !== TORCH && distance + 1 + 7 < torchOption.distance) {
                torchOption.distance = distance + 1 + 7;
                queue.changePriority(torchOption);
              }
            }

            // climbing gear
            if (caveSystem[y][x].riskLevel !== NARROW) {
              if (tool === CLIMBING_GEAR && distance + 1 < climbingGearOption.distance) {
                climbingGearOption.distance = distance + 1;
                queue.changePriority(climbingGearOption);
              } else if (tool !== CLIMBING_GEAR && distance + 1 + 7 < climbingGearOption.distance) {
                climbingGearOption.distance = distance + 1 + 7;
                queue.changePriority(climbingGearOption);
              }
            }

            break;
          case WET:
            // climbing gear
            if (caveSystem[y][x].riskLevel !== NARROW) {
              if (tool === CLIMBING_GEAR && distance + 1 < climbingGearOption.distance) {
                climbingGearOption.distance = distance + 1;
                queue.changePriority(climbingGearOption);
              } else if (tool !== CLIMBING_GEAR && distance + 1 + 7 < climbingGearOption.distance) {
                climbingGearOption.distance = distance + 1 + 7;
                queue.changePriority(climbingGearOption);
              }
            }

            // no equipment
            if (caveSystem[y][x].riskLevel !== ROCKY) {
              if (tool === NONE && distance + 1 < noneOption.distance) {
                noneOption.distance = distance + 1;
                queue.changePriority(noneOption);
              } else if (tool !== NONE && distance + 1 + 7 < noneOption.distance) {
                noneOption.distance = distance + 1 + 7;
                queue.changePriority(noneOption);
              }
            }

            break;
          case NARROW:
            // torch
            if (caveSystem[y][x].riskLevel !== WET) {
              if (tool === TORCH && distance + 1 < torchOption.distance) {
                torchOption.distance = distance + 1;
                queue.changePriority(torchOption);
              } else if (tool !== TORCH && distance + 1 + 7 < torchOption.distance) {
                torchOption.distance = distance + 1 + 7;
                queue.changePriority(torchOption);
              }
            }

            // no equipment
            if (caveSystem[y][x].riskLevel !== ROCKY) {
              if (tool === NONE && distance + 1 < noneOption.distance) {
                noneOption.distance = distance + 1;
                queue.changePriority(noneOption);
              } else if (tool !== NONE && distance + 1 + 7 < noneOption.distance) {
                noneOption.distance = distance + 1 + 7;
                queue.changePriority(noneOption);
              }
            }

            break;
        }
      }
    }

    return graph[targetY][targetX]
      .map(toolDist => toolDist.distance + (toolDist.tool === TORCH ? 0 : 7))
      .reduce((prev, curr) => Math.min(prev, curr), Infinity);
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
            .trim()
        );
      } else if (lineIndex === 1) {
        line
          .split(' ')
          .pop()!
          .trim()
          .split(',')
          .forEach((coord, coordIndex) => {
            if (coordIndex === 0) {
              targetX = parseInt(coord);
            } else {
              targetY = parseInt(coord);
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
    const caveSystem: IRegion[][] = new Array(targetY + 10);
    for (let i = 0; i < caveSystem.length; i++) {
      caveSystem[i] = new Array(targetX + 55);
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
