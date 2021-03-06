import State from '.';
// import State from '../../../dist/stama.js';

const expectFail = f => async () => {
  let succeed = false;

  try {
    await f();
    succeed = true;
  } catch (e) {}

  if (succeed) throw new Error('Expected failure, but succeeded');
};

describe('State', () => {
  test(
    'throws when directly setting state',
    expectFail(() => {
      const result = new State();

      result.state = 1;
    })
  );

  test('has empty state', () => {
    const result = new State();

    expect(result.state).toBe(undefined);
  });

  test('correctly sets state', () => {
    const result = new State({ test: 1 });

    expect(result.state).toMatchObject({ test: 1 });
  });

  test('setState works', () => {
    const result = new State({ test: 1, other: 2 });

    result.setState({ test: 5 });

    expect(result.state).toMatchObject({ test: 5, other: 2 });
  });

  test('setState callback works', () => {
    const result = new State({ test: 1 });

    let called = false;

    result.setState({}, () => {
      called = true;
    });

    expect(called).toBe(true);
  });

  test('correctly sets state with derive static', () => {
    const result = new class extends State {
      static deriveProps(state) {
        return { value: state.test + 1 };
      }

      constructor() {
        super({ test: 1 });
      }

      test = () => this.setState({ test: 4 });
    }();

    expect(result.state).toMatchObject({ test: 1, value: 2 });

    result.test();

    expect(result.state).toMatchObject({ test: 4, value: 5 });
  });

  test('correctly sets state with derive non-static', () => {
    const result = new class extends State {
      deriveProps(state) {
        return { value: state.test + 1 };
      }

      constructor() {
        super({ test: 1 });
      }

      test = () => this.setState({ test: 4 });
    }();

    expect(result.state).toMatchObject({ test: 1, value: 2 });

    expect(result.state).toMatchObject({ test: 1, value: 2 });

    result.test();

    expect(result.state).toMatchObject({ test: 4, value: 5 });
  });

  test('subscribe works', () => {
    const result = new State({ test: 1 });
    let received = null;

    const listener = v => (received = v);

    result.subscribe(listener);

    expect(received).toEqual({ test: 1 });
    result.setState({ test: 2 });
    expect(received).toEqual({ test: 2 });
  });

  test('unsubscribe works', () => {
    const result = new State({ test: 1 });
    let received = null;

    const listener = v => (received = v);

    const subscription = result.subscribe(listener);
    expect(received).toEqual({ test: 1 });
    subscription.unsubscribe();

    result.setState({ test: 2 });
    expect(received).toEqual({ test: 1 });
  });

  test('forceUpdate works', () => {
    const nested = { test: 1 };

    const result = new class extends State {
      deriveProps(state) {
        return { nestedValue: state.nested.test };
      }

      constructor() {
        super({ nested });
      }
    }();

    expect(result.state.nested.test).toBe(1);
    expect(result.state.nestedValue).toBe(1);

    nested.test = 5;

    expect(result.state.nested.test).toBe(5);
    expect(result.state.nestedValue).toBe(1);

    result.forceStateUpdate();

    expect(result.state.nested.test).toBe(5);
    expect(result.state.nestedValue).toBe(5);
  });

  test('stateDidChange works', () => {
    const result = new class extends State {
      constructor() {
        super({ test: 1 });
      }

      stateDidChange(newState, oldState) {
        this.newState = newState;
        this.oldState = oldState;
      }
    }();

    expect(result.newState).toEqual({ test: 1 });
    expect(result.oldState).toBe(undefined);

    result.setState({ test: 5 });

    expect(result.newState).toEqual({ test: 5 });
    expect(result.oldState).toEqual({ test: 1 });
  });

  test('clone works', () => {
    const result = new State({ test: 1, other: 5 });

    const cloned = result.clone();

    expect(result.state).toMatchObject(cloned.state);
  });

  test('function updater works', () => {
    const result = new State({ value: 1, other: 5 });

    result.setState(({ value }) => ({ value: value + 1 }));

    expect(result.state).toMatchObject({ value: 2, other: 5 });
  });

  test('callback called even when no state passed', () => {
    const result = new State({ value: 1 });

    let called = false;

    result.setState(null);

    result.setState(null, () => (called = true));

    expect(called).toBe(true);
  });
});
