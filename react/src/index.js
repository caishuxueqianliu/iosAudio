import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import md5 from 'js-md5'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
React.Component.prototype.$md5 = md5
React.Component.prototype.$moment = moment
// antd-ui
import "antd/dist/antd.css";
ReactDOM.render(
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
