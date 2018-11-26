interface ISolver {
  solve(): Promise<string>;
  filePath: string;
}

export default ISolver;
