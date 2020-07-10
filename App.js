/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Form from './src/Components/Form/Form'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import formReducer from './store/reducers/formReducer';

const store = createStore(formReducer);


const App = () => {
  return (
    <Provider store={store}>
      <Form />
    </Provider>
  );
};


export default App;
