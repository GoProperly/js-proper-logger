import { ProperLogger, LogLevels } from '..';

describe('LogLevels', () => {
  it('logging levels correspond to acending values as severity increases', () => {
    expect(LogLevels.DEBUG).toEqual(10);
    expect(LogLevels.INFO).toEqual(20);
    expect(LogLevels.WARNING).toEqual(30);
    expect(LogLevels.ERROR).toEqual(40);
  });
});
