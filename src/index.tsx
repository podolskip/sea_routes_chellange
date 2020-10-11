import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { Router } from 'react-router-dom';
// import  history  from 'src/configuration/history';
import storeConfig from 'src/store/store-config';
import App from './App';
import './index.css';

export const store = storeConfig();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Router history={history}> */}
      <App />
      {/* </Router> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
