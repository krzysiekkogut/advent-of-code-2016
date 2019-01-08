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

  protected solvePart1(fight: IFight): string {
    const afterFight = this.playBattle(fight);
    return (afterFight.immuneArmy.groups.length > 0 ? afterFight.immuneArmy.groups : afterFight.infectionArmy.groups)
      .map(group => group.noOfUnits)
      .reduce((prev, curr) => prev + curr, 0)
      .toString();
  }

  protected solvePart2({ immuneArmy, infectionArmy }: IFight): string {
    let boost = 1;
    while (true) {
      const afterFight = this.playBattle({
        immuneArmy: immuneArmy.clone(boost),
        infectionArmy: infectionArmy.clone(),
      });

      if (!afterFight.tie && afterFight.immuneArmy.groups.length > 0) {
        return afterFight.immuneArmy.groups
          .map(group => group.noOfUnits)
          .reduce((prev, curr) => prev + curr, 0)
          .toString();
      }

      boost++;
    }
  }

  protected parseInput(textInput: string): IFight {
    const lines = textInput.split(EOL);
    const immuneSystemStart = lines.indexOf('Immune System:') + 1;
    const infectionStart = lines.indexOf('Infection:') + 1;

    const immuneLines = lines.slice(immuneSystemStart, infectionStart - 2).filter(line => !!line.trim());
    const infectionLines = lines.slice(infectionStart).filter(line => !!line.trim());

    const immuneArmy = new Army(
      immuneLines.map((line, index) => this.parseGroupDescription(`Immune ${index + 1}`, line))
    );
    const infectionArmy = new Army(
      infectionLines.map((line, index) => this.parseGroupDescription(`Infection ${index + 1}`, line))
    );

    return {
      immuneArmy,
      infectionArmy,
    };
  }

  private parseGroupDescription(id: string, groupDescription: string): Group {
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
      id,
      parseInt(noOfUnits, 10),
      parseInt(unitHitPoints, 10),
      weaknesses,
      immunities,
      parseInt(attackPower, 10),
      attackType as AttackType,
      parseInt(initiative, 10)
    );
  }

  private playBattle({ immuneArmy, infectionArmy }: IFight): IFight & { tie: boolean } {
    while (immuneArmy.groups.length > 0 && infectionArmy.groups.length > 0) {
      const planAll = immuneArmy
        .createPlan(infectionArmy)
        .concat(infectionArmy.createPlan(immuneArmy))
        .sort((planA, planB) => planB.attackingGroup.initiative - planA.attackingGroup.initiative);

      if (planAll.every(plan => plan.enemyGroup.calculateDamage(plan.attackingGroup) < plan.enemyGroup.unitHitPoints)) {
        return { immuneArmy, infectionArmy, tie: true };
      }

      planAll.forEach(plan => plan.attackingGroup.attack(plan.enemyGroup));
      immuneArmy.cleanDeadGroups();
      infectionArmy.cleanDeadGroups();
    }

    return { immuneArmy, infectionArmy, tie: false };
  }
}
