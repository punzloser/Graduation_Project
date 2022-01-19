import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressBook, faBars, faFileVideo, faFilter, faHatCowboy, faKey, faMailBulk, faStar, faTachometerAlt, faTheaterMasks, faUser } from '@fortawesome/free-solid-svg-icons';
import { Snow } from './Components/Utilities/Snow';

library.add(
  faStar, faTachometerAlt, faAddressBook, faHatCowboy, faTheaterMasks,
  faFileVideo, faUser, faFilter, faBars, faKey, faMailBulk
);

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Snow />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
