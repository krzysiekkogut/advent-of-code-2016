import Group from './Group';

interface IPlan {
  attackingGroup: Group;
  enemyGroup: Group;
}

export default class Army {
  constructor(public groups: Group[]) {}

  public createPlan(enemyArmy: Army): IPlan[] {
    const chosen: Group[] = [];
    return this.groups
      .sort(Group.compareGroups)
      .map(attackingGroup => {
        const damageForEnemy = enemyArmy.groups
          .filter(g => chosen.indexOf(g) < 0)
          .map(enemyGroup => ({
            damage: enemyGroup.calculateDamage(attackingGroup),
            enemyGroup,
          }))
          .sort(Group.compareTargets);

        if (damageForEnemy.length === 0 || damageForEnemy[0].damage === 0) {
          return { damage: 0, enemyGroup: null };
        }

        chosen.push(damageForEnemy[0].enemyGroup);

        return {
          attackingGroup,
          damage: damageForEnemy[0].damage,
          enemyGroup: damageForEnemy[0].enemyGroup,
        };
      })
      .filter(p => !!p.enemyGroup) as IPlan[];
  }

  public cleanDeadGroups(): void {
    this.groups = this.groups.filter(g => g.noOfUnits > 0);
  }
}
