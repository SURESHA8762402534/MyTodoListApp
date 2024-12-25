import { createStore, combineReducers, applyMiddleware, AnyAction } from 'redux';
import { todoReducer } from './reducer';
import  {thunk, ThunkMiddleware } from 'redux-thunk';

const rootReducer = combineReducers({
  todo: todoReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<ReturnType<typeof rootReducer>,AnyAction>));

export type RootState = ReturnType<typeof rootReducer>;
