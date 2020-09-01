import { ProperLogger } from '..';

describe("ProperLogger", () => {
  it("It has logging levels", () => {
    expect(ProperLogger.LEVELS.DEBUG).toEqual(10);
    expect(ProperLogger.LEVELS.INFO).toEqual(20);
    expect(ProperLogger.LEVELS.INFO).toEqual(30);
    expect(ProperLogger.LEVELS.ERROR).toEqual(40);
  });
});
