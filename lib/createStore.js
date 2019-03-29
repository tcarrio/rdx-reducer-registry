
import { combineReducers, createStore } from 'redux';
import ReducerRegistry from './reducerRegistry';

// Preserve initial state for not-yet-loaded reducers
const combine = (reducers, initialState = {}) => {
    const reducerNames = Object.keys(reducers);
    Object.keys(initialState).forEach(item => {
        if (reducerNames.indexOf(item) === -1) {
            reducers[item] = (state = null) => state;
        }
    });
    return combineReducers(reducers);
};

export default (registry = new ReducerRegistry(), initialState = {}) => {
    const reducer = combine(registry.getReducers());
    const store = createStore(reducer, initialState);

    registry.setChangeListener(reducers => {
        store.replaceReducer(combine(reducers));
    });

    return store;
}
