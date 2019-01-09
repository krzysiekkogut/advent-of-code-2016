import { EOL } from 'os';
import BaseSolver from './BaseSolver';

interface IRoom {
  encryptedName: string;
  sectorId: number;
  checksum: string;
}

export default class Solver04 extends BaseSolver<IRoom[]> {
  protected filePath = '4.txt';

  protected solvePart1(input: IRoom[]): number {
    return input
      .filter(room => this.isRealRoom(room))
      .map(room => room.sectorId)
      .reduce((prev, curr) => prev + curr, 0);
  }

  protected solvePart2(input: IRoom[]): number {
    return input
      .filter(room => this.isRealRoom(room))
      .map(room => ({ name: this.decryptName(room), room }))
      .find(pair => pair.name === 'northpole object storage')!.room.sectorId;
  }

  protected parseInput(textInput: string): IRoom[] {
    return textInput
      .split(EOL)
      .filter(l => !!l)
      .map(line => {
        const [encryptedName, sectorId, checksum] = line.match(/([\w-]+)-(\d+)\[(\w+)\]/)!.slice(1);
        return { checksum, encryptedName, sectorId: parseInt(sectorId) };
      });
  }

  private isRealRoom(room: IRoom): boolean {
    return this.createChecksum(room.encryptedName) === room.checksum;
  }

  private createChecksum(roomName: string): string {
    const map = new Map<string, number>();
    for (const letter of roomName.split('')) {
      if (letter === '-') continue;
      map.set(letter, (map.get(letter) || 0) + 1);
    }

    return Array.from(map.entries())
      .map(e => ({ letter: e[0], count: e[1] }))
      .sort((a, b) => (a.count === b.count ? (a.letter < b.letter ? -1 : 1) : b.count - a.count))
      .slice(0, 5)
      .map(pair => pair.letter)
      .join('');
  }

  private decryptName(room: IRoom): string {
    let result = '';

    for (const letter of room.encryptedName.split('')) {
      result += letter === '-' ? ' ' : String.fromCharCode(((letter.charCodeAt(0) - 97 + room.sectorId) % 26) + 97);
    }

    return result;
  }
}
