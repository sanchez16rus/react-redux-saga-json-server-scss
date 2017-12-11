import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import rootStore from './store';
import App from './containers/App';
import './css/style.css';

render(
  <BrowserRouter>
    <Provider store={rootStore}>
        <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);