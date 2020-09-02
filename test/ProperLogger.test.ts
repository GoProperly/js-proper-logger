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
      debug: jest.fn(),
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    return logger;
  }

  it('calls `console.debug` after `.debug`', () => {
    const logger = setupTestLogger();

    expect(logger.console.debug).not.toHaveBeenCalled();

    logger.debug('Now is the winter of our discontent');

    expect((logger.console.debug as jest.Mock).mock.calls).toEqual([
      ['{"message":"Now is the winter of our discontent"}'],
    ]);
  });

  it('calls `console.log` after `.info`', () => {
    const logger = setupTestLogger();

    expect(logger.console.log).not.toHaveBeenCalled();

    logger.info('Made glorious summer by this sun of York');

    expect((logger.console.log as jest.Mock).mock.calls).toEqual([
      ['{"message":"Made glorious summer by this sun of York"}'],
    ]);
  });

  it('calls `console.warning` after `.warning`', () => {
    const logger = setupTestLogger();

    expect(logger.console.warn).not.toHaveBeenCalled();

    logger.warning('What do I fear? Myself? There’s none else by.');

    expect((logger.console.warn as jest.Mock).mock.calls).toEqual([
      ['{"message":"What do I fear? Myself? There’s none else by."}'],
    ]);
  });

  it('calls `console.error` after `.error`', () => {
    const logger = setupTestLogger();

    expect(logger.console.error).not.toHaveBeenCalled();

    logger.error('Richard loves Richard; that is, I and I.');

    expect((logger.console.error as jest.Mock).mock.calls).toEqual([
      ['{"message":"Richard loves Richard; that is, I and I."}'],
    ]);
  });
});
