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

  constructor(name: string) {
    this.name = name;
    // Here we grab a reference to the `global.console` so that in tests we can
    // patch this out.
    this.console = global.console;
    this.commonTags = {};
    this.logLevel = LogLevels.INFO;
    if (process.env.PROPERLY_LOG_LEVEL) {
      const envValue = parseInt(process.env.PROPERLY_LOG_LEVEL, 10);
      if (envValue >= 0 && envValue < Number.MAX_SAFE_INTEGER) {
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

  private prepareLog(
    message: string | null,
    thingsToLog: Record<string, any>
  ): string {
    const firstPart: Record<string, string> = {};
    if (message) {
      firstPart.message = message;
    }

    return JSON.stringify({ ...firstPart, ...this.commonTags, ...thingsToLog });
  }

  debug(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.DEBUG) {
      return;
    }
    this.console.debug(this.prepareLog(message, { ...extraTags }));
  }

  info(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.INFO) {
      return;
    }
    this.console.log(this.prepareLog(message, { ...extraTags }));
  }

  warning(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.WARNING) {
      return;
    }
    this.console.warn(this.prepareLog(message, { ...extraTags }));
  }

  error(message: string, extraTags?: Tags): void {
    if (this.logLevel > LogLevels.ERROR) {
      return;
    }
    this.console.error(this.prepareLog(message, { ...extraTags }));
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
