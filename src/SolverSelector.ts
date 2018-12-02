import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';

import Solver1 from './solvers/Solver1';
import Solver2 from './solvers/Solver2';

class SolverSelector {
  public static select(day: number, variant: PuzzleVariant): ISolver {
    switch (day) {
      case 1:
        return new Solver1(variant);
      case 2:
        return new Solver2(variant);
    }

    throw new Error('Solution not implemented yet.');
  }
}

export default SolverSelector;
