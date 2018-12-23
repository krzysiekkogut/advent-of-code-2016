import BaseSolver from './BaseSolver';

export default class Solver14 extends BaseSolver<number> {
  protected filePath: string = '14.txt';

  protected solvePart1(input: number): string {
    const recipes: number[] = [3, 7];
    let elf1 = 0;
    let elf2 = 1;

    while (recipes.length < input + 10) {
      const newRecipe = recipes[elf1] + recipes[elf2];
      if (newRecipe < 10) {
        recipes.push(newRecipe);
      } else {
        recipes.push(Math.floor(newRecipe / 10), newRecipe % 10);
      }

      elf1 += recipes[elf1] + 1;
      elf1 %= recipes.length;
      elf2 += recipes[elf2] + 1;
      elf2 %= recipes.length;
    }

    return recipes.slice(input, input + 10).join('');
  }

  protected solvePart2(input: number): string {
    throw new Error('Method not implemented.');
  }

  protected parseInput(textInput: string): number {
    return parseInt(textInput, 10);
  }
}
