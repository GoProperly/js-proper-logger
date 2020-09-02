/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
export const LogLevels = {
  DEBUG: 10,
  INFO: 20,
  WARNING: 30,
  ERROR: 40,
};

type Tags = Record<string, any>;

export class ProperLogger {
  name: string;

  console: Pick<Console, 'debug' | 'log' | 'warn' | 'error'>;

  static getLogger(name: string): ProperLogger {
    return new ProperLogger(name);
  }

  constructor(name: string) {
    this.name = name;
    // Here we grab a reference to the `global.console` so that in tests we can
    // patch this out.
    this.console = global.console;
  }

  addCommonTags(commonTags: Tags): void {
    // TODO implement
  }

  clearCommonTags(): void {
    // TODO implement
  }

  debug(message: string, extraTags?: Tags): void {
    this.console.debug(JSON.stringify({ message, ...extraTags }));
  }

  info(message: string, extraTags?: Tags): void {
    this.console.log(JSON.stringify({ message, ...extraTags }));
  }

  warning(message: string, extraTags?: Tags): void {
    this.console.warn(JSON.stringify({ message, ...extraTags }));
  }

  error(message: string, extraTags?: Tags): void {
    this.console.error(JSON.stringify({ message, ...extraTags }));
  }
}
