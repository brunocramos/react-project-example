import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.localStorage.debug = process.env.NODE_ENV !== 'production' ? 'BOOT,FORM,DOCUMENTS,debug' : null;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
