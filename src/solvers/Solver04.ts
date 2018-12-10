import { EOL } from 'os';
import BaseSolver from './BaseSolver';

type GuardAction = 'wakes up' | 'falls asleep';

interface ILog {
  date: Date;
  guardId: number;
  action: GuardAction;
}

export default class Solver4 extends BaseSolver<ILog[]> {
  protected filePath: string = '4.txt';

  protected solvePart1(input: ILog[]): string {
    const minutesSleepMap = new Map<number, Map<number, number>>();
    input.forEach((logEntry, index) => {
      if (logEntry.action === 'falls asleep') {
        const wakeUpMinute = input[index + 1].date.getMinutes();
        const guardMap = minutesSleepMap.get(logEntry.guardId) || new Map<number, number>();

        for (let minute = logEntry.date.getMinutes(); minute < wakeUpMinute; minute++) {
          const currentMinuteSleepCount = guardMap.get(minute) || 0;
          guardMap.set(minute, currentMinuteSleepCount + 1);
        }

        minutesSleepMap.set(logEntry.guardId, guardMap);
      }
    });

    const max = {
      guardId: -1,
      minute: -1,
      minuteFrequency: -1,
      sleepTime: -1,
    };
    minutesSleepMap.forEach((guardMinuteMap, guardId) => {
      const totalGuardSleepTime = Array.from(guardMinuteMap.values()).reduce((prev, curr) => prev + curr, 0);
      if (totalGuardSleepTime > max.sleepTime) {
        max.sleepTime = totalGuardSleepTime;
        max.guardId = guardId;
        guardMinuteMap.forEach((frequency, minute) => {
          if (frequency > max.minuteFrequency) {
            max.minuteFrequency = frequency;
            max.minute = minute;
          }
        });
      }
    });

    return (max.minute * max.guardId).toString();
  }

  protected solvePart2(input: ILog[]): string {
    const minutesSleepMap = new Map<number, Map<number, number>>();
    input.forEach((logEntry, index) => {
      if (logEntry.action === 'falls asleep') {
        const wakeUpMinute = input[index + 1].date.getMinutes();
        const guardMap = minutesSleepMap.get(logEntry.guardId) || new Map<number, number>();
        for (let minute = logEntry.date.getMinutes(); minute < wakeUpMinute; minute++) {
          const currentMinuteSleepCount = guardMap.get(minute) || 0;
          guardMap.set(minute, currentMinuteSleepCount + 1);
        }

        minutesSleepMap.set(logEntry.guardId, guardMap);
      }
    });

    let maxFrequency = -1;
    let mostFrequentMinute = -1;
    let mostFrequentGuardId = -1;

    minutesSleepMap.forEach((guardMinuteMap, guardId) => {
      guardMinuteMap.forEach((frequency, minute) => {
        if (frequency > maxFrequency) {
          maxFrequency = frequency;
          mostFrequentMinute = minute;
          mostFrequentGuardId = guardId;
        }
      });
    });

    return (mostFrequentMinute * mostFrequentGuardId).toString();
  }

  protected parseInput(textInput: string): ILog[] {
    const inputLines = textInput.split(EOL);
    inputLines.sort();

    const log: ILog[] = [];
    let currentGuardId = -1;
    const startShiftRegExp = /^\[(\d{4}\-\d{2}-\d{2} \d{2}:\d{2})\] Guard #(\d+) begins shift$/;
    const wakeSleepRegExp = /^\[(\d{4}\-\d{2}-\d{2} \d{2}:\d{2})\] (wakes up|falls asleep)$/;
    for (const inputLine of inputLines) {
      const startShiftMatch = inputLine.match(startShiftRegExp);
      if (startShiftMatch) {
        currentGuardId = parseInt(startShiftMatch[2], 10);
      } else {
        const wakeSleepMatch = inputLine.match(wakeSleepRegExp)!;
        log.push({
          // tslint:disable:object-literal-sort-keys
          guardId: currentGuardId,
          date: new Date(wakeSleepMatch[1]),
          action: wakeSleepMatch[2] as GuardAction,
          // tslint:enable:object-literal-sort-keys
        });
      }
    }

    return log;
  }
}
