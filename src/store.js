import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    // ...可以增加其他的reducer
    form: formReducer
});

const store = createStore(rootReducer);

export default store;