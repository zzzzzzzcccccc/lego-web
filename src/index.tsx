import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import App from './App';
import { ConfigProvider } from 'antd'
import stores from './store'
import zhCN from 'antd/es/locale/zh_CN';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider {...stores}>
      <App />
    </Provider>
  </ConfigProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
