import React from 'react';
import './css/index.css'
import Layout from './layout/Layout';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store/Store';

const App = () => {


  return (
    <BrowserRouter>
    <Provider store={store}>
      <div>
        <Layout/>
      </div>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
