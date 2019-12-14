import AppNavigator from './navigation/AppNavigator';
import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);

export default class App extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <AppNavigator />      
            </Provider>
        );
    }
}

