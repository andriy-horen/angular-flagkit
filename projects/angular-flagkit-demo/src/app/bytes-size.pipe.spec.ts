import { BytesSizePipe } from './bytes-size.pipe';

describe('BytesSizePipe', () => {
  it('create an instance', () => {
    const pipe = new BytesSizePipe();
    expect(pipe).toBeTruthy();
  });
});
