import BaseSolver from './BaseSolver';

interface INode {
  childNodes: INode[];
  metadata: number[];
  value: number;
}

export default class Solver8 extends BaseSolver<number[]> {
  protected filePath: string = '8org.txt';

  protected solvePart1(input: number[]): number {
    const tree = this.buildTree(input);

    let metadataSum = 0;
    const queue: INode[] = [tree];
    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      metadataSum += currentNode.metadata.reduce((curr, prev) => curr + prev, 0);
      queue.push(...currentNode.childNodes);
    }

    return metadataSum;
  }

  protected solvePart2(input: number[]): number {
    const tree = this.buildTree(input);
    return tree.value;
  }

  protected parseInput(textInput: string): number[] {
    return textInput.split(' ').map(t => parseInt(t.trim()));
  }

  private buildTree(data: number[]): INode {
    const numberOfChildNodes = data.shift()!;
    const numberOfMetadata = data.shift()!;

    const childNodes: INode[] = [];
    for (let i = 0; i < numberOfChildNodes; i++) {
      childNodes.push(this.buildTree(data));
    }

    const metadata = data.splice(0, numberOfMetadata);
    let value = 0;
    if (numberOfChildNodes === 0) {
      value = metadata.reduce((prev, curr) => prev + curr, 0);
    } else {
      metadata.forEach(index => {
        if (index <= childNodes.length) {
          value += childNodes[index - 1].value;
        }
      });
    }

    return {
      childNodes,
      metadata,
      value,
    };
  }
}
