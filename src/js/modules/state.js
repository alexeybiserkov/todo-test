export default function useState(initialValue, reducer) {
  let state = initialValue;
  const callbacks = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(getState(), action);
    callbacks.forEach((callback) => callback(state));
  };

  const subscribe = (callback) => {
    callbacks.push(callback);
  };

  return [getState, dispatch, subscribe];
}