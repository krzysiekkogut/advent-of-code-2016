import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';

import Solver1 from './solvers/1/Solver1';

class SolverSelector {
  public static select(day: number, variant: PuzzleVariant): ISolver {
    switch (day) {
      case 1:
        switch (variant) {
          case PuzzleVariant.PART_1:
            return new Solver1();
        }
        break;
    }

    throw new Error('Solution not implemented yet.');
  }
}

export default SolverSelector;
