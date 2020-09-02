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

  debug(message: string, extraTags?: Tags): void {
    this.console.debug(
      JSON.stringify({ message, ...this.commonTags, ...extraTags })
    );
  }

  info(message: string, extraTags?: Tags): void {
    this.console.log(
      JSON.stringify({ message, ...this.commonTags, ...extraTags })
    );
  }

  warning(message: string, extraTags?: Tags): void {
    this.console.warn(
      JSON.stringify({ message, ...this.commonTags, ...extraTags })
    );
  }

  error(message: string, extraTags?: Tags): void {
    this.console.error(
      JSON.stringify({ message, ...this.commonTags, ...extraTags })
    );
  }
}
