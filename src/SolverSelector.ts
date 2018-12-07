import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';

import Solver1 from './solvers/Solver1';
import Solver2 from './solvers/Solver2';
import Solver3 from './solvers/Solver3';
import Solver4 from './solvers/Solver4';
import Solver5 from './solvers/Solver5';
import Solver6 from './solvers/Solver6';
import Solver7 from './solvers/Solver7';

class SolverSelector {
  public static select(day: number, variant: PuzzleVariant): ISolver {
    switch (day) {
      case 1:
        return new Solver1(variant);
      case 2:
        return new Solver2(variant);
      case 3:
        return new Solver3(variant);
      case 4:
        return new Solver4(variant);
      case 5:
        return new Solver5(variant);
      case 6:
        return new Solver6(variant);
      case 7:
        return new Solver7(variant);
    }

    throw new Error('Solution not implemented yet.');
  }
}

export default SolverSelector;
