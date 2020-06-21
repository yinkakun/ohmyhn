import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import stories from './reducer';

const configureStore = () => createStore(stories, applyMiddleware(thunk));

export default configureStore;
