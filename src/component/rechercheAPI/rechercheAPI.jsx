import PropTypes from 'prop-types';

export default function TrSearch({ serie, ajouterfav, indice }) {
  return (
    <tr>
      <td>{serie.Title}</td>
      <td>{serie.Year}</td>
      <td>
        <img
          src={serie.Poster}
          alt={serie.Title}
          width="80"
        />
      </td>
      <td className="align-middle">
        <button
          onClick={() => ajouterfav(indice)}
          className="btn btn-outline-secondary"
        >
          <i className="fa fa-plus"></i>
        </button>
      </td>
    </tr>
  );
}

TrSearch.propTypes = {
  serie: PropTypes.object.isRequired,
  ajouterfav: PropTypes.func.isRequired,
  indice: PropTypes.number.isRequired,
};


/*function RechercheFilm({cover,titre,souhait }){

    return(
        <>
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card h-100 text-center">
                    <div className="fs-1 p-4">{cover}</div>
                    <div className="card-body">
                    <h5 className="card-title">{titre}</h5>
                    <p className="card-text">ajout&nbsp;: {souhait ? 'added' : 'not-added'}</p>
                    </div>
                    <button className="btn btn-outline-primary" onClick={onClick}>
                    {souhait ? 'ajouter' : 'enlever'}
                    </button>
                </div>
            </div>
        </>
    )
}

RechercheFilm.propTypes = {
  cover: PropTypes.string.isRequired,
  titre: PropTypes.string.isRequired,
  souhait: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default RechercheFilm;*/