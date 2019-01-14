import BaseSolver from './BaseSolver';

interface IElf {
  id: number;
  next?: IElf;
  prev?: IElf;
}

export default class Solver19 extends BaseSolver<number> {
  protected filePath = '19.txt';

  protected solvePart1(noOfElfs: number): number {
    const root: IElf = {
      id: 1,
    };

    let currentElf = root;

    for (let index = 1; index <= noOfElfs; index++) {
      currentElf.next = index === noOfElfs ? root : { id: index + 1, prev: currentElf };
      currentElf = currentElf.next;
    }
    root.prev = currentElf;

    let size = noOfElfs;
    while (size > 1) {
      currentElf.next = currentElf.next!.next;
      currentElf.next!.prev = currentElf;
      currentElf = currentElf.next!;
      size--;
    }

    return currentElf.id;
  }

  protected solvePart2(noOfElfs: number): number {
    const root: IElf = {
      id: 1,
    };
    const halfIndex = Math.floor(noOfElfs / 2);
    let currentElf = root;
    let opposite: IElf;
    for (let index = 1; index <= noOfElfs; index++) {
      currentElf.next = index === noOfElfs ? root : { id: index + 1, prev: currentElf };
      currentElf = currentElf.next!;
      if (index === halfIndex) {
        opposite = currentElf;
      }
    }
    root.prev = currentElf;

    let size = noOfElfs;
    while (size > 1) {
      opposite!.next!.prev = opposite!.prev;
      opposite!.prev!.next = opposite!.next;
      opposite = size % 2 === 1 ? opposite!.next!.next! : opposite!.next!;
      currentElf = currentElf.next!;
      size--;
    }

    return currentElf.id;
  }

  protected parseInput(textInput: string): number {
    return parseInt(textInput);
  }
}
