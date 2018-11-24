import { modifyState, createProps } from './index';

describe('State Utils: modifyState', () => {
  test('empty state', async () => {
    const initState = {};

    const result1 = modifyState(initState, {});
    const result2 = modifyState(initState, null);
    const result3 = modifyState(initState);

    expect(result1).toEqual(initState);
    expect(result2).toEqual(initState);
    expect(result3).toEqual(initState);
  });

  test('no state change', async () => {
    const initState = { value: 1 };

    const result1 = modifyState(initState, {});
    const result2 = modifyState(initState, null);
    const result3 = modifyState(initState);

    expect(result1).toEqual(initState);
    expect(result2).toEqual(initState);
    expect(result3).toEqual(initState);
  });

  test('simple state change', async () => {
    const initState = { value: 1, test: false };

    const result1 = modifyState(initState, { value: 10 });
    const result2 = modifyState(initState, () => ({ value: 10 }));

    const expectedState = { value: 10, test: false };

    expect(result1).toEqual(expectedState);
    expect(result2).toEqual(expectedState);
  });

  test('modify state', async () => {
    const initState = { value: 1, test: false };

    const result1 = modifyState(initState, ({ value }) => ({
      value: value + 10
    }));
    const result2 = modifyState(initState, { value: v => v + 10 });

    const expectedState = { value: 11, test: false };

    expect(result1).toEqual(expectedState);
    expect(result2).toEqual(expectedState);
  });

  test('nested set', async () => {
    const initState = { value: 1, nested: { test: false } };

    const result1 = modifyState(initState, () => ({
      nested: { test: true }
    }));
    const result2 = modifyState(initState, { nested: { test: true } });

    const expectedState = { value: 1, nested: { test: true } };

    expect(result1).toEqual(expectedState);
    expect(result2).toEqual(expectedState);
  });

  test('nested modify', async () => {
    const initState = { value: 1, nested: { test: false, foo: 1 } };

    const result1 = modifyState(initState, ({ nested }) => ({
      nested: { test: !nested.test }
    }));
    const result2 = modifyState(initState, { nested: { test: v => !v } });

    const expectedState = { value: 1, nested: { test: true, foo: 1 } };

    expect(result1).toEqual(expectedState);
    expect(result2).toEqual(expectedState);
  });

  test('no side-effects', async () => {
    const initState = { value: 1, nested: { test: false, foo: 1 } };

    modifyState(initState, ({ nested }) => ({
      value: 5,
      nested: { test: !nested.test }
    }));
    modifyState(initState, { value: v => v + 1, nested: { test: v => !v } });

    expect(initState.value).toBe(1);
    expect(initState.nested.test).toBe(false);
    expect(initState.nested.foo).toBe(1);
  });

  test('use full state in local update', async () => {
    const initState = { value: 1, other: 10 };

    const result = modifyState(initState, {
      value: (v, { other }) => v + other
    });

    const expectedState = { value: 11, other: 10 };

    expect(result).toEqual(expectedState);
  });

  test('use full old state and partial old state in nested update', async () => {
    const initState = { value: 1, nested: { test: 5, total: 10 } };

    const result = modifyState(initState, {
      value: 3,
      nested: { total: (v, global, local) => v + global.value + local.test }
    });

    const expectedState = { value: 3, nested: { test: 5, total: 16 } };

    expect(result).toEqual(expectedState);
  });

  test('simple derive', async () => {
    const initState = { value: 1 };

    const result = modifyState(initState, null, ({ value }) => ({
      copy: value + 1
    }));

    const expectedState = { value: 1, copy: 2 };

    expect(result).toEqual(expectedState);
  });

  test('does not process objects or classes', async () => {
    const initState = { value: 1 };

    class Test {
      test = () => true;
    }
    const test = new Test();

    const result = modifyState(initState, { value: test });

    const expectedState = { value: test };

    expect(result).toEqual(expectedState);
  });
});

describe('State Utils: createProps', () => {
  test('no creator fails', async () => {
    try {
      createProps();
      expect(true).toBe(false);
    } catch (e) {}
  });

  test('empty creator', async () => {
    const result = createProps({});

    expect(result).toEqual({});
  });

  test('static creator', async () => {
    const result = createProps({ test: 1 });

    const expectedProps = { test: 1 };

    expect(result).toEqual(expectedProps);
  });

  test('dynamic creator', async () => {
    const result = createProps(() => ({ test: 1 }));

    const expectedProps = { test: 1 };

    expect(result).toEqual(expectedProps);
  });

  test('dynamic creator with args', async () => {
    const result = createProps((a, b) => ({ test: a + b }), [1, 2]);

    const expectedProps = { test: 3 };

    expect(result).toEqual(expectedProps);
  });

  test('local creator with args', async () => {
    const result = createProps({ test: (a, b) => a + b }, [1, 2]);

    const expectedProps = { test: 3 };

    expect(result).toEqual(expectedProps);
  });

  test('list creators', async () => {
    const result = createProps([{ value: 1 }, { test: true }]);

    const expectedProps = { value: 1, test: true };

    expect(result).toEqual(expectedProps);
  });

  test('list creators with args', async () => {
    const result = createProps(
      [{ value: (a, b) => a + b }, (a, b) => ({ test: a + b })],
      [1, 2]
    );

    const expectedProps = { value: 3, test: 3 };

    expect(result).toEqual(expectedProps);
  });

  test('stores nested functions', async () => {
    const f = () => {};

    const result = createProps(() => ({ f }));

    const expectedProps = { f };

    expect(result).toEqual(expectedProps);
  });

  test('will not directly store functions', async () => {
    const f = () => {};

    const result = createProps(f);

    const expectedProps = { f };

    expect(result).not.toEqual(expectedProps);
  });

  test('will not process class-based objects', async () => {
    class Test {
      value = () => 1;
    }

    const test = new Test();

    const result = createProps({ test });

    const expectedProps = { test };

    expect(result).toEqual(expectedProps);
  });
});
