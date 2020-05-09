import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import APP from './App'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import 'antd/dist/antd.css';
import { BrowserRouter , HashRouter } from 'react-router-dom'
import { Provider} from 'mobx-react'
import * as serviceWorker from './serviceWorker';
import store from './Redux/store/index'

ReactDOM.render(
  <BrowserRouter>
    <LocaleProvider locale={zhCN}>
        <Provider {...store}>
          <APP></APP>
        </Provider>
    </LocaleProvider >
  </BrowserRouter>,
document.getElementById('root'));

// ReactDOM.render(
//     <Router />,
//   document.getElementById('root')
// );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
