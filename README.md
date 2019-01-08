# advent-of-code-2018

Solutions for Advent of Code 2018

## Run

1. `yarn build`
2. `yarn start ...args`

### Args

1. Day: e.g. for 15th December use `15`
2. Variant: `1` or `2` depending on puzzle part.

## Implementation of new solutions

1. Add file with input to `inputs` folder, e.g. `1.txt`.
2. Create a Solver class that extends `BaseSolver<T>` where `T` is the type of parsed input.
3. Inside `SolverSelector` add a new case and return an instance of Solver.
4. Implement solution in `solvePart1()` and `solvePart2()` methods.
