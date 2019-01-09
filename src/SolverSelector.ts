import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';
import Solver01 from './solvers/Solver01';

class SolverSelector {
  public static select(day: number, variant: PuzzleVariant): ISolver {
    switch (day) {
      case 1:
        return new Solver01(variant);
      default:
        throw new Error('Solution not implemented yet.');
    }
  }
}

export default SolverSelector;
