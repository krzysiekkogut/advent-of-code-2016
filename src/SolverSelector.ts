import PuzzleVariant from './PuzzleVariant';
import ISolver from './solvers/ISolver';

class SolverSelector {
  public static select(day: number, variant: PuzzleVariant): ISolver {
    switch (day) {
      default:
        throw new Error('Solution not implemented yet.');
    }
  }
}

export default SolverSelector;
