/* eslint-disable no-console, @typescript-eslint/no-empty-function */

import { ProperLogger, LogLevels } from '..';

describe('LogLevels', () => {
  test('logging levels correspond to acending values as severity increases', () => {
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

  describe('debug', () => {
    test('only message', () => {
      const logger = setupTestLogger();

      expect(logger.console.debug).not.toHaveBeenCalled();

      logger.debug('I think there be six Richmonds in the field;');

      expect((logger.console.debug as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            message: 'I think there be six Richmonds in the field;',
          }),
        ],
      ]);
    });

    test('with `extraTags`', () => {
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
  });

  describe('info', () => {
    test('only message', () => {
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

    test('with `extraTags`', () => {
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
  });

  describe('warning', () => {
    test('with only message', () => {
      const logger = setupTestLogger();

      expect(logger.console.warn).not.toHaveBeenCalled();

      logger.warning('What do I fear? Myself? There’s none else by.');

      expect((logger.console.warn as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            message: 'What do I fear? Myself? There’s none else by.',
          }),
        ],
      ]);
    });

    test('with `extraTags`', () => {
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
  });

  describe('error', () => {
    test('with only message', () => {
      const logger = setupTestLogger();

      expect(logger.console.error).not.toHaveBeenCalled();

      logger.error('Richard loves Richard; that is, I and I.');

      expect((logger.console.error as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            message: 'Richard loves Richard; that is, I and I.',
          }),
        ],
      ]);
    });

    test('with `extraTags`', () => {
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

  test('can add common tags', () => {
    const logger = setupTestLogger();

    expect(logger.console.log).not.toHaveBeenCalled();

    logger.addCommonTags({ play: 'Richard III' });
    logger.info(
      'Unless to see my shadow in the sun And descant on mine own deformity',
      {
        act: 'i',
        scene: 'i',
      }
    );

    expect((logger.console.log as jest.Mock).mock.calls[0][0]).toEqual(
      JSON.stringify({
        message:
          'Unless to see my shadow in the sun And descant on mine own deformity',
        play: 'Richard III',
        act: 'i',
        scene: 'i',
      })
    );

    logger.addCommonTags({ year: 1633 });
    logger.info('I am determinèd to prove a villain');

    expect((logger.console.log as jest.Mock).mock.calls[1][0]).toEqual(
      JSON.stringify({
        message: 'I am determinèd to prove a villain',
        play: 'Richard III',
        year: 1633,
      })
    );
  });

  test('can update common tags', () => {
    const logger = setupTestLogger();

    expect(logger.console.log).not.toHaveBeenCalled();

    logger.addCommonTags({ play: 'Richard III', year: 1633 });
    logger.info('I am determinèd to prove a villain');

    expect((logger.console.log as jest.Mock).mock.calls[0][0]).toEqual(
      JSON.stringify({
        message: 'I am determinèd to prove a villain',
        play: 'Richard III',
        year: 1633,
      })
    );

    // This movie version has Ian McKellen
    logger.addCommonTags({ year: 1995 });
    logger.info('I am determinèd to prove a villain');

    expect((logger.console.log as jest.Mock).mock.calls[1][0]).toEqual(
      JSON.stringify({
        message: 'I am determinèd to prove a villain',
        play: 'Richard III',
        year: 1995,
      })
    );
  });

  test('can clear common tags', () => {
    const logger = setupTestLogger();

    expect(logger.console.log).not.toHaveBeenCalled();

    logger.addCommonTags({ play: 'Richard III', year: 1633 });
    logger.info('some day or two Your Highness shall repose you at the Tower;');

    expect((logger.console.log as jest.Mock).mock.calls[0][0]).toEqual(
      JSON.stringify({
        message: 'some day or two Your Highness shall repose you at the Tower;',
        play: 'Richard III',
        year: 1633,
      })
    );

    // This movie version has Ian McKellen
    logger.clearCommonTags();
    logger.info(
      'Then where you please and shall be thought most fit For your best health and recreation.'
    );

    expect((logger.console.log as jest.Mock).mock.calls[1][0]).toEqual(
      JSON.stringify({
        message:
          'Then where you please and shall be thought most fit For your best health and recreation.',
      })
    );
  });
});
