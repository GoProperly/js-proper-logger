/* eslint-disable no-console, @typescript-eslint/no-empty-function */

import { ProperLogger, LogLevels } from '..';

describe('LogLevels', () => {
  it('logging levels correspond to acending values as severity increases', () => {
    expect(LogLevels.DEBUG).toEqual(10);
    expect(LogLevels.INFO).toEqual(20);
    expect(LogLevels.WARNING).toEqual(30);
    expect(LogLevels.ERROR).toEqual(40);
  });
});

describe('ProperLogger', () => {
  function setupTestLogger(): ProperLogger {
    const logger = new ProperLogger('test');
    logger.console = {
      log: jest.fn(),
    };

    return logger;
  }

  it('logs to the console at an info level', () => {
    const logger = setupTestLogger();

    expect(logger.console.log).not.toHaveBeenCalled();

    logger.info('Logs to the console');

    expect((logger.console.log as jest.Mock).mock.calls).toEqual([
      ['{"message":"Logs to the console"}'],
    ]);
  });
});
