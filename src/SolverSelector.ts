import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';
import Solver01 from './solvers/Solver01';
import Solver02 from './solvers/Solver02';
import Solver03 from './solvers/Solver03';
import Solver04 from './solvers/Solver04';
import Solver05 from './solvers/Solver05';
import Solver06 from './solvers/Solver06';
import Solver07 from './solvers/Solver07';
import Solver08 from './solvers/Solver08';
import Solver09 from './solvers/Solver09';
import Solver10 from './solvers/Solver10';
import Solver11 from './solvers/Solver11';
import Solver12 from './solvers/Solver12';
import Solver13 from './solvers/Solver13';
import Solver14 from './solvers/Solver14';
import Solver15 from './solvers/Solver15';
import Solver16 from './solvers/Solver16';
import Solver17 from './solvers/Solver17';
import Solver18 from './solvers/Solver18';
import Solver19 from './solvers/Solver19';

class SolverSelector {
  public static select(day: number, variant: PuzzleVariant): ISolver {
    switch (day) {
      case 1:
        return new Solver01(variant);
      case 2:
        return new Solver02(variant);
      case 3:
        return new Solver03(variant);
      case 4:
        return new Solver04(variant);
      case 5:
        return new Solver05(variant);
      case 6:
        return new Solver06(variant);
      case 7:
        return new Solver07(variant);
      case 8:
        return new Solver08(variant);
      case 9:
        return new Solver09(variant);
      case 10:
        return new Solver10(variant);
      case 11:
        return new Solver11(variant);
      case 12:
        return new Solver12(variant);
      case 13:
        return new Solver13(variant);
      case 14:
        return new Solver14(variant);
      case 15:
        return new Solver15(variant);
      case 16:
        return new Solver16(variant);
      case 17:
        return new Solver17(variant);
      case 18:
        return new Solver18(variant);
      case 19:
        return new Solver19(variant);
      default:
        throw new Error('Solution not implemented yet.');
    }
  }
}

export default SolverSelector;
