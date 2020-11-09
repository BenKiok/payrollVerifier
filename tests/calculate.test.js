import calculate from '../src/calculate.js';

it('calculates shift length', () => {
    let arr1 = [4, 53, 'PM'],
        arr2 = [1, 41, 'AM'],
        arr3 = [6, 29, 'AM'],
        arr4 = [9, 7, 'PM'];

    expect(calculate.shift(arr1, arr1)).toBe(0);
    expect(calculate.shift(arr1, arr2)).toBe(-15.2);
    expect(calculate.shift(arr2, arr1)).toBe(15.2);
    expect(calculate.shift(arr3, arr4)).toBeCloseTo(14.633);
});

it('returns a total wage for a shift', () => {
    expect(calculate.wage(100, 10)).toBe(1000);
    expect(calculate.wage(52.0694, 12.74)).toBeCloseTo(663.364);
});

it('calculates various taxes', () => {
    expect(calculate.tax.fed(360)).toBeCloseTo(12.15);
    expect(calculate.tax.medicare(360)).toBeCloseTo(5.22);
    expect(calculate.tax.socialSecurity(360)).toBeCloseTo(22.32);
    expect(calculate.tax.state(360)).toBeCloseTo(16.62);
    expect(calculate.tax.medLeave(360)).toBeCloseTo(0.89);
    expect(calculate.tax.famLeave(360)).toBeCloseTo(0.47);
});

it('returns pay after taxes', () => {
    expect(calculate.netPay(360)).toBeCloseTo(302.33);
    expect(calculate.netPay(7914)).toBeCloseTo(6646.20);
    expect(calculate.netPay(931)).toBeCloseTo(781.8569);
})
