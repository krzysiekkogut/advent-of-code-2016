import BaseSolver from './BaseSolver';
import FightMap from './15/FightMap';

export default class Solver15 extends BaseSolver<FightMap> {
  protected filePath = '15.txt';

  protected solvePart1(input: FightMap): string {
    throw new Error('Method not implemented.');
  }
  protected solvePart2(input: FightMap): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): FightMap {
    return new FightMap(textInput);
  }
}
