import FightMap from './FightMap';
import Unit from './Unit';

export default class Field {
  constructor(
    public row: number,
    public col: number,
    private map: FightMap,
    public isCavern: boolean,
    public unit: Unit | null = null
  ) {}
}
