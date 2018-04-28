import React from 'react';
import ReactDOM from 'react-dom';
import App from './scenes/App';
import registerServiceWorker from './services/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
