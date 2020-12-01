/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
export const LogLevels = {
  DEBUG: 10,
  INFO: 20,
  WARNING: 30,
  ERROR: 40,
};

type Tags = Record<string, any>;

export class ProperLogger {
  name: string;

  commonTags: Tags;

  logLevel: number;

  console: Pick<Console, 'debug' | 'log' | 'warn' | 'error'>;

  static loggerInstances: Record<string, ProperLogger> = {};

  static getLogger(name: string): ProperLogger {
    const memoizedInstance = ProperLogger.loggerInstances[name];
    if (memoizedInstance !== undefined) {
      return memoizedInstance;
    }
    const newInstance = new ProperLogger(name);
    ProperLogger.loggerInstances[name] = newInstance;

    return newInstance;
  }

  constructor(name: string, commonTags?: Tags) {
    this.name = name;
    // Here we grab a reference to the `global.console` so that in tests we can
    // patch this out.
    this.console = global.console;
    this.commonTags = commonTags || {};

    // Setup the logging level to the value of the `PROPERLY_LOG_LEVEL` or, if
    // the enviroment variable is missing, default to `INFO`.
    this.logLevel = LogLevels.INFO;
    if (process.env.PROPERLY_LOG_LEVEL) {
      const envValue = parseInt(process.env.PROPERLY_LOG_LEVEL, 10);
      if (envValue >= 0) {
        this.logLevel = envValue;
      }
    }
  }

  addCommonTags(commonTags: Tags): void {
    this.commonTags = {
      ...this.commonTags,
      ...commonTags,
    };
  }

  clearCommonTags(): void {
    this.commonTags = {};
  }

  private prepareLog(message: string | null, extraTags: Tags): string {
    const firstPart: Record<string, string> = {};
    if (message) {
      firstPart.message = message;
    }

    return JSON.stringify({ ...firstPart, ...this.commonTags, ...extraTags });
  }

  // We have seen an issue before where a primative value was passed in as an
  // `extraTags` field. This caused logging to fail which was an undesirable
  // failure mode.
  private checkTags(tags: Tags): Tags {
    if (!(tags && typeof tags === 'object' && !Array.isArray(tags))) {
      this.warning(
        'RECEIVED_INVALID_TAGS',
        'Received invalid value for tags.',
        {
          tags,
        }
      );

      return {};
    }

    return tags;
  }

  debug(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.DEBUG) {
      return;
    }
    const safeExtraTags = this.checkTags(extraTags || {});
    this.console.debug(this.prepareLog(message, safeExtraTags));
  }

  info(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.INFO) {
      return;
    }
    const safeExtraTags = this.checkTags(extraTags || {});
    this.console.log(this.prepareLog(message, safeExtraTags));
  }

  warning(name: string, message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.WARNING) {
      return;
    }
    const safeExtraTags = this.checkTags(extraTags || {});
    this.console.warn(
      this.prepareLog(null, {
        warning_name: name,
        warning_message: message,
        ...safeExtraTags,
      })
    );
  }

  error(name: string, message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.ERROR) {
      return;
    }
    const safeExtraTags = this.checkTags(extraTags || {});
    this.console.error(
      this.prepareLog(null, {
        error_name: name,
        error_message: message,
        ...safeExtraTags,
      })
    );
  }

  metric(
    metricName: string,
    metricValue: string | number | boolean | null | undefined,
    extraTags?: Tags
  ): void {
    const safeExtraTags = this.checkTags(extraTags || {});
    this.console.log(
      this.prepareLog(null, {
        metric_name: metricName,
        metric_value: metricValue,
        ...safeExtraTags,
      })
    );
  }
}
