import FightMap from './15/FightMap';
import BaseSolver from './BaseSolver';

export default class Solver15 extends BaseSolver<FightMap> {
  protected filePath = '15.txt';

  protected solvePart1(map: FightMap): string {
    while (map.startNextRound) {
      const units = map.getAllUnits();
      for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        if (unit.hitPoints > 0) {
          if (!unit.move()) {
            break;
          }
          unit.attack();
        }

        if (i === units.length - 1) {
          map.noOfFinishedRounds++;
        }
      }
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
