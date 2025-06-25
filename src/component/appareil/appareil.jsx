import PropTypes from 'prop-types';
import React from 'react';

function Appareil({ icon, nom, etat, onClick }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 text-center">
        <div className="fs-1 p-4">{icon}</div>
        <div className="card-body">
          <h5 className="card-title">{nom}</h5>
          <p className="card-text">État&nbsp;: {etat ? 'On' : 'Off'}</p>
        </div>
        <button className="btn btn-outline-primary" onClick={onClick}>
          {etat ? 'Éteindre' : 'Allumer'}
        </button>
      </div>
    </div>
  );
}

Appareil.propTypes = {
  icon: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  etat: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Appareil;
