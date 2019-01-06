import BaseSolver from './BaseSolver';

interface INode {
  x: number;
  y: number;
  nextNodes: INode[];
  distance: number;
}

export default class Solver20 extends BaseSolver<string[]> {
  protected filePath = '20.txt';

  protected solvePart1(input: string[]): string {
    const nodes = this.createMap(input);
    return Array.from(nodes.values())
      .map(m => Array.from(m.values()))
      .reduce((prev, curr) => prev.concat(curr), [])
      .sort((nodeA, nodeB) => (nodeA.distance > nodeB.distance ? -1 : 1))[0]
      .distance.toString();
  }

  protected solvePart2(input: string[]): string {
    const nodes = this.createMap(input);
    return Array.from(nodes.values())
      .map(m => Array.from(m.values()))
      .reduce((prev, curr) => prev.concat(curr), [])
      .filter(node => node.distance >= 1000)
      .length.toString();
  }

  protected parseInput(textInput: string): string[] {
    return textInput.slice(1, textInput.length - 1).split('');
  }

  private createMap(directions: string[]): Map<number, Map<number, INode>> {
    const startNode: INode = { x: 0, y: 0, nextNodes: [], distance: 0 };
    let currentNode = startNode;
    const nodes: Map<number, Map<number, INode>> = new Map();
    nodes.set(0, new Map([[0, startNode]]));

    const stack: INode[] = [];
    directions.forEach(step => {
      let nextNode: INode;
      switch (step) {
        case 'N':
          nextNode = this.getNextNode(currentNode.x, currentNode.y + 1, currentNode, nodes);
          currentNode.nextNodes.push(nextNode);
          currentNode = nextNode;
          break;
        case 'S':
          nextNode = this.getNextNode(currentNode.x, currentNode.y - 1, currentNode, nodes);
          currentNode.nextNodes.push(nextNode);
          currentNode = nextNode;
          break;
        case 'W':
          nextNode = this.getNextNode(currentNode.x - 1, currentNode.y, currentNode, nodes);
          currentNode.nextNodes.push(nextNode);
          currentNode = nextNode;
          break;
        case 'E':
          nextNode = this.getNextNode(currentNode.x + 1, currentNode.y, currentNode, nodes);
          currentNode.nextNodes.push(nextNode);
          currentNode = nextNode;
          break;
        case '(':
          stack.push(currentNode);
          break;
        case ')':
          stack.pop();
          break;
        case '|':
          currentNode = stack[stack.length - 1];
          break;
      }
    });

    return nodes;
  }

  private getNextNode(x: number, y: number, currentNode: INode, nodes: Map<number, Map<number, INode>>): INode {
    const row = nodes.get(x);
    let node: INode | undefined;
    if (row) {
      node = row.get(y);
    }

    if (node) {
      node.distance = Math.min(node.distance, currentNode.distance + 1);
      return node;
    }

    node = { x, y, nextNodes: [], distance: currentNode.distance + 1 };

    if (!nodes.has(x)) {
      nodes.set(x, new Map());
    }

    if (!nodes.get(x)!.has(y)) {
      nodes.get(x)!.set(y, node);
    }

    return node;
  }
}
