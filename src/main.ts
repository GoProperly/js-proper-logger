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

  static getLogger(name: string): ProperLogger {
    return new ProperLogger(name);
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

  debug(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.DEBUG) {
      return;
    }
    this.console.debug(this.prepareLog(message, extraTags || {}));
  }

  info(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.INFO) {
      return;
    }
    this.console.log(this.prepareLog(message, extraTags || {}));
  }

  warning(name: string, message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.WARNING) {
      return;
    }
    this.console.warn(
      this.prepareLog(null, {
        warning_name: name,
        warning_message: message,
        ...extraTags,
      })
    );
  }

  error(name: string, message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.ERROR) {
      return;
    }
    this.console.error(
      this.prepareLog(null, {
        error_name: name,
        error_message: message,
        ...extraTags,
      })
    );
  }

  metric(
    metricName: string,
    metricValue: string | number | boolean | null | undefined,
    extraTags?: Tags
  ): void {
    this.console.log(
      this.prepareLog(null, {
        metric_name: metricName,
        metric_value: metricValue,
        ...extraTags,
      })
    );
  }
}
