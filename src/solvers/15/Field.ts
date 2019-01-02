type Unit = 'E' | 'G' | 'none';

export default class Field {
  constructor(
    public row: number,
    public col: number,
    public unit: Unit,
    public isCavern: boolean,
    public isWall: boolean,
    public attackPower: number = 3,
    public hitPoints: number = 200
  ) {}
}
