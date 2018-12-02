import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';

import Solver1 from './solvers/Solver1';
import Solver2 from './solvers/Solver2';

class SolverSelector {
  public static select(day: number, variant: PuzzleVariant): ISolver {
    switch (day) {
      case 1:
        switch (variant) {
          case PuzzleVariant.PART_1:
            return new Solver1();
          case PuzzleVariant.PART_2:
            return new Solver1(PuzzleVariant.PART_2);
        }
        break;
      case 2:
        switch (variant) {
          case PuzzleVariant.PART_1:
            return new Solver2();
        }
    }

    throw new Error('Solution not implemented yet.');
  }
}

export default SolverSelector;
