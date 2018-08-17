import { Utility as util } from '../util.js';

test('숫자 3자리 마다 콤마를 찍습니다', () => {
    const num = 440000;
    expect(util.numberWithCommas(num)).toBe('440,000');
});