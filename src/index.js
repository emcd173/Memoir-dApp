// Import React Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import Scenes
import Home from './scenes/Home/Home';

// Import Components
import Header from '../components/header/header';

// Import Services
import registerServiceWorker from './services/registerServiceWorker';


ReactDOM.render(
  <BrowserRouter>
    <div className="container-fluid">
        <div className="App">
          <Header></Header>
          <Switch> 
            <Route exact path='/' component={Home}/>
            <Route path="/personal" component={Home}/>
            <Route path="/upload" component={Home}/>
          </Switch>
        </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
