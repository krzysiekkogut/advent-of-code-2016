import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';
import Solver01 from './solvers/Solver01';
import Solver02 from './solvers/Solver02';
import Solver03 from './solvers/Solver03';
import Solver04 from './solvers/Solver04';
import Solver05 from './solvers/Solver05';
import Solver06 from './solvers/Solver06';
import Solver07 from './solvers/Solver07';

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
      default:
        throw new Error('Solution not implemented yet.');
    }
  }
}

export default SolverSelector;
