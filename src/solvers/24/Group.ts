export type AttackType = 'bludgeoning' | 'cold' | 'fire' | 'slashing' | 'radiation';

export default class Group {
  public static compareGroups(groupA: Group, groupB: Group): number {
    return groupA.effectivePower === groupB.effectivePower
      ? groupB.initiative - groupA.initiative
      : groupB.effectivePower - groupA.effectivePower;
  }

  public static compareTargets(
    targetA: { damage: number; enemyGroup: Group },
    targetB: { damage: number; enemyGroup: Group }
  ): number {
    return targetA.damage === targetB.damage
      ? Group.compareGroups(targetA.enemyGroup, targetB.enemyGroup)
      : targetB.damage - targetA.damage;
  }

  constructor(
    public id: string,
    public noOfUnits: number,
    public unitHitPoints: number,
    public weaknesses: AttackType[],
    public immunities: AttackType[],
    public attackPower: number,
    public attackType: AttackType,
    public initiative: number
  ) {}

  public clone(additionalAttackPower = 0): Group {
    return new Group(
      this.id,
      this.noOfUnits,
      this.unitHitPoints,
      this.weaknesses.slice(),
      this.immunities.slice(),
      this.attackPower + additionalAttackPower,
      this.attackType,
      this.initiative
    );
  }

  public get effectivePower(): number {
    return this.attackPower * this.noOfUnits;
  }

  public attack(enemyGroup: Group): void {
    if (this.noOfUnits <= 0) return;
    const damage = enemyGroup.calculateDamage(this);
    const unitsToKill = Math.min(Math.floor(damage / enemyGroup.unitHitPoints), enemyGroup.noOfUnits);
    enemyGroup.noOfUnits -= unitsToKill;
  }

  public calculateDamage(enemyGroup: Group): number {
    if (this.immunities.find(i => i === enemyGroup.attackType)) {
      return 0;
    }

    if (this.weaknesses.find(w => w === enemyGroup.attackType)) {
      return enemyGroup.effectivePower * 2;
    }

    return enemyGroup.effectivePower;
  }
}
