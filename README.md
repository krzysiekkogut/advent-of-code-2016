# advent-of-code-2016

Solutions for Advent of Code 2016

## Run

1. `yarn build`
2. `yarn start ...args`

### Args

1. Day: e.g. for 15th December use `15`
2. Variant: `1` or `2` depending on puzzle part.

## Implementation of new solutions

1. Add file with input to `inputs` folder, e.g. `1.txt`.
2. Create a Solver class that extends `BaseSolver<TIn, TOut1, TOut2 = TOut1>` where `TIn` is the type of parsed input, `TOut1` type of output for first part, `TOut2` type of output for first part.
3. Inside `SolverSelector` add a new case and return an instance of Solver.
4. Implement solution in `solvePart1()` and `solvePart2()` methods.
