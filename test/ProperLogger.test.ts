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
      logger.logLevel = LogLevels.DEBUG;

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
      logger.logLevel = LogLevels.DEBUG;

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

    test('does not log if `logLevel` is above debug', () => {
      const logger = setupTestLogger();
      logger.logLevel = LogLevels.INFO;

      expect(logger.console.debug).not.toHaveBeenCalled();

      logger.debug('Legitimate Edgar, I must have your land.');

      expect(logger.console.debug).not.toHaveBeenCalled();

      // If the log level is then downgraded to `DEBUG` we should then see logs again.
      logger.logLevel = LogLevels.DEBUG;
      logger.debug('Shall top the legitimate. I grow; I prosper.');

      expect((logger.console.debug as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            message: 'Shall top the legitimate. I grow; I prosper.',
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

    test('does not log if `logLevel` is above INFO', () => {
      const logger = setupTestLogger();
      logger.logLevel = LogLevels.WARNING;

      expect(logger.console.log).not.toHaveBeenCalled();

      logger.info('No, I’ll not weep.');

      expect(logger.console.log).not.toHaveBeenCalled();

      // If the log level is then downgraded to `INFO` we should then see logs again.
      logger.logLevel = LogLevels.INFO;
      logger.info('I have full cause of weeping, but this heart ');

      expect((logger.console.log as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            message: 'I have full cause of weeping, but this heart ',
          }),
        ],
      ]);
    });
  });

  describe('warning', () => {
    test('with only message', () => {
      const logger = setupTestLogger();

      expect(logger.console.warn).not.toHaveBeenCalled();

      logger.warning(
        'Ego_Overload',
        'What do I fear? Myself? There’s none else by.'
      );

      expect((logger.console.warn as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            warning_name: 'Ego_Overload',
            warning_message: 'What do I fear? Myself? There’s none else by.',
          }),
        ],
      ]);
    });

    test('with `extraTags`', () => {
      const logger = setupTestLogger();

      expect(logger.console.warn).not.toHaveBeenCalled();

      logger.warning(
        'Ego_Overload',
        'What do I fear? Myself? There’s none else by.',
        {
          act: 'v',
          scene: 'iii',
        }
      );

      expect((logger.console.warn as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            warning_name: 'Ego_Overload',
            warning_message: 'What do I fear? Myself? There’s none else by.',
            act: 'v',
            scene: 'iii',
          }),
        ],
      ]);
    });

    test('does not log if `logLevel` is above WARNING', () => {
      const logger = setupTestLogger();
      logger.logLevel = LogLevels.ERROR;

      expect(logger.console.warn).not.toHaveBeenCalled();

      logger.warning(
        'Melodrama',
        'Shall break into a hundred thousand flaws, '
      );

      expect(logger.console.warn).not.toHaveBeenCalled();

      // If the log level is then downgraded to `WARNING` we should then see logs again.
      logger.logLevel = LogLevels.WARNING;
      logger.warning('Melodrama', 'Or ere I’ll weep. O fool, I shall go mad!');

      expect((logger.console.warn as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            warning_name: 'Melodrama',
            warning_message: 'Or ere I’ll weep. O fool, I shall go mad!',
          }),
        ],
      ]);
    });
  });

  describe('error', () => {
    test('with only message', () => {
      const logger = setupTestLogger();

      expect(logger.console.error).not.toHaveBeenCalled();

      logger.error(
        'Richard_Confusion',
        'Richard loves Richard; that is, I and I.'
      );

      expect((logger.console.error as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            error_name: 'Richard_Confusion',
            error_message: 'Richard loves Richard; that is, I and I.',
          }),
        ],
      ]);
    });

    test('with `extraTags`', () => {
      const logger = setupTestLogger();

      expect(logger.console.error).not.toHaveBeenCalled();

      logger.error(
        'Richard_Confusion',
        'Richard loves Richard; that is, I and I.',
        {
          act: 'v',
          scene: 'iii',
        }
      );

      expect((logger.console.error as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            error_name: 'Richard_Confusion',
            error_message: 'Richard loves Richard; that is, I and I.',
            act: 'v',
            scene: 'iii',
          }),
        ],
      ]);
    });

    test('does not log if `logLevel` is above ERROR', () => {
      const logger = setupTestLogger();
      // We don't have a constant for this. The Python logger has one level
      // above this called `CRITICAL`.
      logger.logLevel = 50;

      expect(logger.console.error).not.toHaveBeenCalled();

      logger.error('Sad_Lear', 'Howl, howl, howl, howl!');

      expect(logger.console.error).not.toHaveBeenCalled();

      // If the log level is then downgraded to `ERROR` we should then see logs again.
      logger.logLevel = LogLevels.ERROR;
      logger.error('Sad_Lear', 'That heaven’s vault should crack');

      expect((logger.console.error as jest.Mock).mock.calls).toEqual([
        [
          JSON.stringify({
            error_name: 'Sad_Lear',
            error_message: 'That heaven’s vault should crack',
          }),
        ],
      ]);
    });
  });

  describe('metric', () => {
    test('can log different kinds of metrics', () => {
      const logger = setupTestLogger();

      logger.metric('num_witches', 3);

      expect((logger.console.log as jest.Mock).mock.calls[0][0]).toEqual(
        JSON.stringify({
          metric_name: 'num_witches',
          metric_value: 3,
        })
      );

      logger.metric('kings_name', 'Old Norway');

      expect((logger.console.log as jest.Mock).mock.calls[1][0]).toEqual(
        JSON.stringify({
          metric_name: 'kings_name',
          metric_value: 'Old Norway',
        })
      );

      logger.metric('overthinks', true);

      expect((logger.console.log as jest.Mock).mock.calls[2][0]).toEqual(
        JSON.stringify({
          metric_name: 'overthinks',
          metric_value: true,
        })
      );

      logger.metric('what_yorick_thinks', null);

      expect((logger.console.log as jest.Mock).mock.calls[3][0]).toEqual(
        JSON.stringify({
          metric_name: 'what_yorick_thinks',
          metric_value: null,
        })
      );
    });

    test('allows extra tags', () => {
      const logger = setupTestLogger();

      logger.metric('Cladius', 'mean', { why: 'not a very supportive uncle' });

      expect((logger.console.log as jest.Mock).mock.calls[0][0]).toEqual(
        JSON.stringify({
          metric_name: 'Cladius',
          metric_value: 'mean',
          why: 'not a very supportive uncle',
        })
      );
    });

    test('includes common tags', () => {
      const logger = setupTestLogger();

      logger.addCommonTags({ year: 1601 });
      logger.metric('ear poison', 'hebenon');

      expect((logger.console.log as jest.Mock).mock.calls[0][0]).toEqual(
        JSON.stringify({
          year: 1601,
          metric_name: 'ear poison',
          metric_value: 'hebenon',
        })
      );
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

  test('has `INFO` log level if enviroment variable not set', () => {
    delete process.env.PROPERLY_LOG_LEVEL;

    const logger = setupTestLogger();

    expect(logger.logLevel).toEqual(LogLevels.INFO);
  });

  test('can have log level set by enviroment variable', () => {
    process.env.PROPERLY_LOG_LEVEL = LogLevels.DEBUG.toString();
    expect(setupTestLogger().logLevel).toEqual(LogLevels.DEBUG);

    process.env.PROPERLY_LOG_LEVEL = LogLevels.INFO.toString();
    expect(setupTestLogger().logLevel).toEqual(LogLevels.INFO);
  });

  test('has `INFO` log level if enviroment variable has invalid values', () => {
    process.env.PROPERLY_LOG_LEVEL = undefined;
    expect(setupTestLogger().logLevel).toEqual(LogLevels.INFO);

    process.env.PROPERLY_LOG_LEVEL = '-10';
    expect(setupTestLogger().logLevel).toEqual(LogLevels.INFO);

    process.env.PROPERLY_LOG_LEVEL = 'Potato';
    expect(setupTestLogger().logLevel).toEqual(LogLevels.INFO);
  });
});
