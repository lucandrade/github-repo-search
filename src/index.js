import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './Resources/Style/app.scss';

ReactDOM.render(
  <React.StrictMode>
    <div className="app">Content</div>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
