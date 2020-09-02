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

    logger.debug('I think there be six Richmonds in the field;', {
      act: 'v',
      scene: 'iv',
    });

    expect((logger.console.debug as jest.Mock).mock.calls).toEqual([
      [
        JSON.stringify({
          message: 'I think there be six Richmonds in the field;',
          act: 'v',
          scene: 'iv',
        }),
      ],
    ]);
  });

  it('calls `console.log` after `.info` - without extra tags', () => {
    const logger = setupTestLogger();

    expect(logger.console.log).not.toHaveBeenCalled();

    logger.info('A horse, a horse, my kingdom for a horse!');

    expect((logger.console.log as jest.Mock).mock.calls).toEqual([
      [
        JSON.stringify({
          message: 'A horse, a horse, my kingdom for a horse!',
        }),
      ],
    ]);
  });

  it('calls `console.log` after `.info`', () => {
    const logger = setupTestLogger();

    expect(logger.console.log).not.toHaveBeenCalled();

    logger.info('A horse, a horse, my kingdom for a horse!', {
      act: 'v',
      scene: 'iv',
    });

    expect((logger.console.log as jest.Mock).mock.calls).toEqual([
      [
        JSON.stringify({
          message: 'A horse, a horse, my kingdom for a horse!',
          act: 'v',
          scene: 'iv',
        }),
      ],
    ]);
  });

  it('calls `console.warning` after `.warning`', () => {
    const logger = setupTestLogger();

    expect(logger.console.warn).not.toHaveBeenCalled();

    logger.warning('What do I fear? Myself? There’s none else by.', {
      act: 'v',
      scene: 'iii',
    });

    expect((logger.console.warn as jest.Mock).mock.calls).toEqual([
      [
        JSON.stringify({
          message: 'What do I fear? Myself? There’s none else by.',
          act: 'v',
          scene: 'iii',
        }),
      ],
    ]);
  });

  it('calls `console.error` after `.error`', () => {
    const logger = setupTestLogger();

    expect(logger.console.error).not.toHaveBeenCalled();

    logger.error('Richard loves Richard; that is, I and I.', {
      act: 'v',
      scene: 'iii',
    });

    expect((logger.console.error as jest.Mock).mock.calls).toEqual([
      [
        JSON.stringify({
          message: 'Richard loves Richard; that is, I and I.',
          act: 'v',
          scene: 'iii',
        }),
      ],
    ]);
  });
});
