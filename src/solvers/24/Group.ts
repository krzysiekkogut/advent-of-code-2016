export type AttackType = 'bludgeoning' | 'cold' | 'fire' | 'slashing' | 'radiation';

export default class Group {
  constructor(
    public noOfUnits: number,
    public unitHitPoints: number,
    public weaknesses: AttackType[],
    public immunities: AttackType[],
    public attackPower: number,
    public attackType: AttackType,
    public initiative: number
  ) {}
}
