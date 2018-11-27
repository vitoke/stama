# Stama JS

A simple and flexible state manager/machine.

## Installation

`yarn add stama`

## Usage

### Simple

```
import State from 'stama';

class CounterState extends State {
  static initState = { count: 0 }

  increase = () => this.modState({ count: v => v + 1 })

  decrease = () => this.modState({ count: v => v - 1 })

  reset: () => this.setState({ count : 0 })
}

const counter = new CounterState();

counter.subscribe(console.log);
// prints { count: 0 }

counter.increase();
// prints { count: 1 }
```

### Advanced

```
import State from 'stama';

class DataState extends State {
  static initState = { loading: false, items: [] }

  static deriveProps(state) {
    let totalValue = 0;
    state.items.forEach(item => totalValue += item.value);
    return { totalValue };
  }

  loadData = async url => {
    await this.setState({ loading: true });
    const data = await fetch(url);
    return this.setState({ loading: false, data })
  }
}

const state = new DataState();

state.subscribe(console.log);
// prints { loading: false, data: null, totalValue: 0 }

state.loadData('endpoint/test');
// prints:
//   { loading: true, data: null }
//   { loading: false, data: [...], totalValue: 12.. }
```

## Motivation

There are probably more state managers than there are stars in the sky. Since I like stars,
I decided to create another one.

This state manager takes much inspiration from `unstated`, which in turn mimics the `React`
way of `setState`.

## Details

### `State` class

The `State` class is a base class adding state management capabilities to subclasses.
Just as with `React` state, the state object should not be modified
without calling `setState` or `modState`. Therefore the `.state` property
is read only. However, it is impossible to prevent accidentally modifying the
inner properties of the state. Therefore, the `State` class offers, next to
`setState`, a more powerful `modState` function that makes immutable
state changes a lot easier.

#### `static initState`

If the initial state of the subclass doesn't depend on any inputs, it's easiest to define this
static property on the class. The `State` class will set its initial state to this value,
potentially with derived props if specified.

```
class SimpleState {
  static initState = { someValue: 1 }
}
```

#### `[static] deriveProps(state)`

If any properties need to be derived from the state, it is possible to define a static or instance
method called `deriveProps` that receives the latest state, and can return an object containing
any derived properties.

```
class ExampleState extends State {
  static initState = { value: 5 }

  static deriveProps(state) {
    return { squaredValue: state.value * state.value };
  }
}
```

It is also possible to define a static or instance property with the same name that contains
an object describing for each derived property how it is calculated.

```
class ExampleState extends State {
  static initState = { value: 5 };

  static deriveProps = { squaredValue: state => state.value * state.value };
}
```

#### `constructor([initState])`

Any subclass of State can pass its initial state by calling `super(initState)` in its constructor.
This will immediately set the provided initial state, potentially with derived props if specified.

#### `.state`

Returns the current state of a `State` instance.

#### `.stateStream`

Returns an RxJS Observable emitting every new state.

#### `.subscribe(onNext, [onError], [onComplete])`

Convenience method for `.stateStream.subscribe(...)`
At the moment it will never call onError or onComplete. This may change
in the future if there are use cases for it.

#### `setState(updater, [callback])` (Promise)

Updates the current state according to the updater, and then calls the callback function.
The updater can be an object describing the new state, which then will be directly set.
Or, it can be an update function taking the current state and returning a new one.

`setState` returns a Promise that resolves once the state has been updated,
the callback has been called, and the `stateDidChange` method has been called.

#### `modState(updater, [callback])` (Promise)

Modifies the current state according to the updater, and then calls the callback function.
The updater can be an object describing how the state should be modified.

`modState` is a powerful way to modify parts of existing state. Here are some examples:

```
class ExampleState extends State {
  static initState = {
    value: 5,
    foo: {
      bar: 12,
      other: 33
    }
  }

  increaseValue = () => this.modState({ value: v => v + 1 })

  increaseBar = () => this.modState({ foo: { bar: v => v + 1 })
  
  addValueToBar = () => this.modState({ foo: { bar: (v, state) => v + state.value } })
  
  addBarToValue = () => this.modState({ value: (v, state) => v + state.foo.bar })
  
  addBarToOther = () => this.modState({ foo: { other: (v, _, foo) => v + foo.bar } })
  
  setOtherToZero = () => this.modState({ foo: { other: 0 } })
  
  changeAll = () => this.modState({
    value: (v, state) => v + state.foo.bar,
    foo: {
      bar: 43,
      other: (v, _, foo) => v + foo.bar
    }
  })
}
```

`modState` returns a Promise that resolves once the state has been updated,
the callback has been called, and the `stateDidChange` method has been called.

#### `stateDidChange(newState, oldState)`
A utility method that is called on every state change. It's probably
not wise to change state in this method.

#### `.forceStateUpdate()`
Sometimes it is unavoidable to have objects in the state that update themselves.
If these changes need to retrigger some state calculation in the current State class,
then forceStateUpdate should be called everytime any relevant object changes it state.
Basically, it does not change the direct state, but since nested objects may have changed
it will again apply `deriveState` on the current state, which may get updated
property values. 

#### `.clone()`
Creates a new instance of the current State class with the exact same state.
