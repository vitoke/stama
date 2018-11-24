const nonClassPrototype = {}.constructor.prototype;

const isNonClassBasedObject = obj =>
  Object.getPrototypeOf(obj) === nonClassPrototype;

export const setState = (oldState, updater, deriveProps) => {
  let result = oldState;

  if (updater) result = { ...oldState };

  if (typeof updater === 'function') Object.assign(result, updater(oldState));
  else Object.assign(result, updater);

  if (!deriveProps) return result;

  if (typeof deriveProps === 'function')
    return Object.assign(result, deriveProps(result));

  if (typeof deriveProps === 'object') {
    Object.keys(deriveProps).forEach(key => {
      const value = deriveProps[key];

      if (typeof value === 'function') result[key] = value(result);
      else result[key] = value;
    });

    return result;
  }

  throw new Error('Modify state: unknown type of derive props');
};

const modifyStateBase = (oldState, updater, globalOldState) => {
  if (!updater) return oldState;

  if (typeof updater === 'function')
    return modifyStateBase(oldState, updater(oldState, globalOldState, oldState));

  const result = { ...oldState };

  Object.keys(updater).forEach(key => {
    const updateProp = updater[key];
    const oldValue = result[key];

    let updatedValue;

    if (typeof updateProp === 'function')
      updatedValue = updateProp(oldValue, globalOldState, oldState);
    else updatedValue = updateProp;

    if (isNonClassBasedObject(updatedValue)) {
      updatedValue = modifyStateBase(oldValue, updatedValue, globalOldState, oldState);
    }

    result[key] = updatedValue;
  });

  return result;
};

export const modifyState = (oldState, updater, deriveProps) => {
  const result = modifyStateBase(oldState, updater, oldState);

  if (!deriveProps) return result;

  if (typeof deriveProps === 'function')
    return Object.assign(result, deriveProps(result));

  if (typeof deriveProps === 'object') {
    Object.keys(deriveProps).forEach(key => {
      const value = deriveProps[key];

      if (typeof value === 'function') result[key] = value(result);
      else result[key] = value;
    });

    return result;
  }

  throw new Error('Modify state: unknown type of derive props');
};

const createPropsBase = (creator, args = []) => {
  let result = creator;

  if (typeof creator === 'function') {
    result = creator(...args);
  } else if (typeof creator === 'object') {
    result = {};

    Object.keys(creator).forEach(key => {
      const value = creator[key];

      if (typeof value === 'function') result[key] = value(...args);
      else result[key] = value;
    });
  } else throw new Error("createProps: don't know how to interpret: ", creator);

  return result;
};

export const createProps = (creator, args) => {
  if (Array.isArray(creator)) {
    const result = {};

    creator.forEach(c => Object.assign(result, createPropsBase(c, args)));

    return result;
  }

  return createPropsBase(creator, args);
};
