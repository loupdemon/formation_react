import React from 'react';
import '../../App.css'
import { NavLink, Routes, Route } from 'react-router-dom';
import logo from '../../../public/logo.png'
import Imc from '../../view/imc/imc'
import Conso from '../../view/conso/conso';
import SerieTV from '../../view/serietv/serietv';
import Domotique from '../../view/domotique/domotique'
import Film from '../../view/film/film';

function Menue() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} alt="Logo" width="30" height="30" className="me-2" />
           Formation
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Calcul de l'IMC
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/conso"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Conso
                </NavLink>
              </li>
               <li className="nav-item">
                <NavLink
                  to="/domotique"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Domotique
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/serietv"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Serie
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/film"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " active" : "")
                  }
                >
                  Films
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Imc />} />
          <Route path="/conso" element={<Conso />} />
          <Route path="/domotique" element={<Domotique />} />
          <Route path="/serietv" element={<SerieTV />} />          
          <Route path="/film" element={<Film />} />

        </Routes>
      </div>
    </>
  );
}

export default Menue;
