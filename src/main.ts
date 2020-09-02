/* eslint-disable no-console */
export const LogLevels = {
  DEBUG: 10,
  INFO: 20,
  WARNING: 30,
  ERROR: 40,
};

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

  debug(message: string): void {
    this.console.debug(JSON.stringify({ message }));
  }

  info(message: string): void {
    this.console.log(JSON.stringify({ message }));
  }

  warning(message: string): void {
    this.console.warn(JSON.stringify({ message }));
  }

  error(message: string): void {
    this.console.error(JSON.stringify({ message }));
  }
}
