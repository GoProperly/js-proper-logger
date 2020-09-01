export const LEVELS = {
  INFO: 10,
  DEBUG: 20,
  WARNING: 30,
  ERROR: 40,
};

export class ProperLogger {
  name: string;

  static getLogger(name: string): ProperLogger {
    return new ProperLogger(name);
  }

  constructor(name: string) {
    this.name = name;
  }
}
