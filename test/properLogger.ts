import { ProperLogger } from '..';

describe("LEVELS", () => {
  it("logging levels correspond to acending values as severity increases", () => {
    expect(ProperLogger.LEVELS.DEBUG).toEqual(10);
    expect(ProperLogger.LEVELS.INFO).toEqual(20);
    expect(ProperLogger.LEVELS.INFO).toEqual(30);
    expect(ProperLogger.LEVELS.ERROR).toEqual(40);
  });
});
