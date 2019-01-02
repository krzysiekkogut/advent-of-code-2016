import FightMap from './15/FightMap';
import NoEnemiesError from './15/NoEnemiesError';
import BaseSolver from './BaseSolver';

export default class Solver15 extends BaseSolver<FightMap> {
  protected filePath = '15.txt';

  protected solvePart1(map: FightMap): string {
    while (map.isFight) {
      const units = map.getAllUnits();
      let fight = true;
      for (let i = 0; i < units.length && fight; i++) {
        const unit = units[i];
        if (unit.hitPoints > 0) {
          try {
            unit.move();
            unit.attack();
          } catch (error) {
            if (error instanceof NoEnemiesError) {
              fight = false;
            } else throw error;
          }
        }
      }

      map.noOfFinishedRounds++;
    }

    const hpLeft = map
      .getAllUnits()
      .map(u => u.hitPoints)
      .reduce((prev, curr) => prev + curr, 0);
    return (map.noOfFinishedRounds * hpLeft).toString();
  }

  protected solvePart2(input: FightMap): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): FightMap {
    return new FightMap(textInput);
  }
}
