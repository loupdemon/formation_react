import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '@fortawesome/fontawesome-free/css/all.min.css'; // ici 
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';


import './index.css'
//---------------------------------------------------------
//---------------------------------------------------------
// on ajoute ici ..

//---------------------------------------------------------
//---------------------------------------------------------

 ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
         <App />
        </BrowserRouter>
  </React.StrictMode>,
)