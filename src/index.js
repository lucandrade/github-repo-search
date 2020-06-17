import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import './Resources/Style/app.scss';
import Form from "./Components/Form/Form";

ReactDOM.render(
  <React.StrictMode>
    <div className="app">
      <Form />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
