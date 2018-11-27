import { BehaviorSubject } from 'rxjs';

import { modifyState, setState } from '../state-utils';

export class State {
  #stateSubject;

  get state() {
    return this.#stateSubject.value;
  }

  get stateStream() {
    return this.#stateSubject.asObservable();
  }

  subscribe = (...args) => this.#stateSubject.subscribe(...args);

  constructor(initState) {
    this.forceStateUpdate = this.forceStateUpdate.bind(this);
    const init = initState || this.constructor.initState;

    if (init) {
      const deriveProps = this.constructor.deriveProps || this.deriveProps;

      this.#stateSubject = new BehaviorSubject(
        setState(init, null, deriveProps)
      );
      this.stateDidChange(this.state);
    } else {
      this.#stateSubject = new BehaviorSubject();
    }
  }

  #updateState = (updater, f, callback) => {
    if (updater === null) {
      if (callback) callback();
      return;
    }

    const deriveProps = this.constructor.deriveProps || this.deriveProps;
    const oldState = this.state;
    const newState = f(oldState, updater, deriveProps);
    this.#stateSubject.next(newState);
    if (callback) callback(newState);
    this.stateDidChange(newState, oldState);
  };

  modState(updater, callback) {
    this.#updateState(updater, modifyState, callback);
  }

  setState(updater, callback) {
    this.#updateState(updater, setState, callback);
  }

  stateDidChange(newState, oldState) {}

  forceStateUpdate() {
    return this.setState({});
  }

  clone() {
    const result = new this.constructor();
    result.#stateSubject.next(this.state);
    return result;
  }
}

export default State;
