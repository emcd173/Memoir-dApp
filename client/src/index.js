// Import React Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Scenes
import Home from './scenes/Home/Home';
import Personal from './scenes/Personal/Personal';

// Import Components
import Header from './components/header/header';

// Import Services
import registerServiceWorker from './services/registerServiceWorker';


ReactDOM.render(
  <BrowserRouter>
    <div className="container-fluid">
        <div className="app">
          <Header></Header>
          <div className="app-body">
            <Switch> 
              <Route exact path='/' component={Home}/>
              <Route path="/personal" component={Personal}/>
            </Switch>
          </div>
        </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
