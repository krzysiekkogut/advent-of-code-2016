import { EOL } from 'os';
import Army from './24/Army';
import Group, { AttackType } from './24/Group';
import BaseSolver from './BaseSolver';

interface IFight {
  immuneArmy: Army;
  infectionArmy: Army;
}

export default class Solver24 extends BaseSolver<IFight> {
  protected filePath = '24.txt';

  protected solvePart1({ immuneArmy, infectionArmy }: IFight): string {
    throw new Error('Method not implemented.');
  }

  protected solvePart2({ immuneArmy, infectionArmy }: IFight): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): IFight {
    const lines = textInput.split(EOL);
    const immuneSystemStart = lines.indexOf('Immune System:') + 1;
    const infectionStart = lines.indexOf('Infection:') + 1;

    const immuneLines = lines.slice(immuneSystemStart, infectionStart - 2).filter(line => !!line.trim());
    const infectionLines = lines.slice(infectionStart).filter(line => !!line.trim());

    const immuneArmy = new Army(immuneLines.map(this.parseGroupDescription));
    const infectionArmy = new Army(infectionLines.map(this.parseGroupDescription));

    return {
      immuneArmy,
      infectionArmy,
    };
  }

  private parseGroupDescription(groupDescription: string): Group {
    const [
      _,
      noOfUnits,
      unitHitPoints,
      weaknessesAndImmunities,
      attackPower,
      attackType,
      initiative,
    ] = groupDescription.match(
      // tslint:disable-next-line:max-line-length
      /(\d+) units each with (\d+) hit points (\([\w\s,;]+\))? ?with an attack that does (\d+) (\w+) damage at initiative (\d+)/
    )!;

    const weaknesses: AttackType[] = [];
    const immunities: AttackType[] = [];
    if (weaknessesAndImmunities) {
      const weaknessesAndImmunitiesArray = weaknessesAndImmunities
        .slice(1, weaknessesAndImmunities.length - 1)
        .split('; ');
      if (weaknessesAndImmunitiesArray.length === 2) {
        if (weaknessesAndImmunitiesArray[0].startsWith('w')) {
          weaknesses.push(...(weaknessesAndImmunitiesArray[0].slice(8).split(', ') as AttackType[]));
          immunities.push(...(weaknessesAndImmunitiesArray[1].slice(10).split(', ') as AttackType[]));
        } else {
          immunities.push(...(weaknessesAndImmunitiesArray[0].slice(10).split(', ') as AttackType[]));
          weaknesses.push(...(weaknessesAndImmunitiesArray[1].slice(8).split(', ') as AttackType[]));
        }
      }

      if (weaknessesAndImmunitiesArray.length === 1 && weaknessesAndImmunitiesArray[0].startsWith('w')) {
        weaknesses.push(...(weaknessesAndImmunitiesArray[0].slice(8).split(', ') as AttackType[]));
      }

      if (weaknessesAndImmunitiesArray.length === 1 && weaknessesAndImmunitiesArray[0].startsWith('i')) {
        immunities.push(...(weaknessesAndImmunitiesArray[0].slice(10).split(', ') as AttackType[]));
      }
    }

    return new Group(
      parseInt(noOfUnits, 10),
      parseInt(unitHitPoints, 10),
      weaknesses,
      immunities,
      parseInt(attackPower, 10),
      attackType as AttackType,
      parseInt(initiative, 10)
    );
  }
}
