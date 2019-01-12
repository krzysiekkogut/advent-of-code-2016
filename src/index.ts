// tslint:disable:no-console
import { EOL } from 'os';
import { performance } from 'perf_hooks';
import ArgsParser from './ArgsParser';
import SolverSelector from './SolverSelector';

(async () => {
  try {
    console.log(`${EOL}======= ADVENT OF CODE 2016 =======${EOL}`);
    const { day, variant } = ArgsParser.parse(process.argv);
    const solver = SolverSelector.select(day, variant);

    const start = performance.now();
    const result = await solver.solve();
    const end = performance.now();

    const duration = (end - start) / 1000;
    console.log(`Solution found in ${duration.toPrecision(4)} seconds.`);
    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`An error occured. See details below.`);
    console.error(error.message || error);
    console.log(error);
  } finally {
    console.log(`${EOL}======= ADVENT OF CODE 2016 =======`);
  }
})();
