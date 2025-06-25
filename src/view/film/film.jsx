import { useRef, useState } from "react";
import TrSearch from "../../component/rechercheAPI/rechercheAPI";
import useLocalStorage from "../../hooks/useLocalStorage";

function Film() {
  const [series, setSeries] = useState([]);
  //const [favoris, setFavoris] = useState([]);
  const [favoris, setFavoris] = useLocalStorage("favorisSeries", []);
  const nomfilm = useRef("");
  const key = "efdc2275";
  const urlBase = `http://www.omdbapi.com/?apikey=${key}&type=series`;

  const rechercheFilm = async () => {
    const url = `${urlBase}&s=${nomfilm.current.value}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.Search) setSeries(data.Search);
  };

  const ajouterFav = (index) => {
    const serie = series[index];
    if (!favoris.some(f => f.imdbID === serie.imdbID)) {
      setFavoris(prev => [...prev, serie]);
    }
  };

  const supprimerFav = (index) => {
    setFavoris(prev => prev.filter((_, i) => i !== index));
  };

  const removeStorage=()=>{
    localStorage.removeItem("favorisSeries");
    setFavoris([]);
  }

  return (
    <>
      <form className="mb-3">
        <div className="row">
            <div className="col-md-8 mb-4">
                <input
                    id="films"
                    ref={nomfilm}
                    placeholder="nom de la série"
                    className="form-control my-2"
                    onChange={rechercheFilm}
                />
            </div>
            <div className="col-md-2 mt-2 ">
                <a href="#" className="btn btn-warning position-relative">
                    🧺Favoris
                    {favoris.length > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger">
                        {favoris.length}
                        <span className="visually-hidden">favoris</span>
                    </span>
                    )}
                </a>
            </div>
            <div className="col-md-2 mt-2 ">
                <a href="#" className="btn btn-danger position-relative" onClick={removeStorage}>
                    🧹Purge ma liste
                </a>
            </div>
        </div>
      </form>

      <div className="row">
        <div className="col-md-6 mb-4 border border-dark">
         <h3>Recherche de séries</h3>
         <table className="table table-striped">
          <thead>
            <tr>
              <th>Séries</th><th>Année</th><th>Image</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {series.map((serie, i) => (
              <TrSearch
                key={serie.imdbID}
                indice={i}
                serie={serie}
                ajouterfav={ajouterFav}
              />
            ))}
          </tbody>
        </table>
        </div>

        <div className="col-md-6 mb-4 border border-quccess">
          <h3>Séries à regarder :</h3>
          <table className="table table-striped">
            <thead>
              <tr><th>Série</th><th>Année</th><th>Image</th><th>Action</th></tr>
            </thead>
            <tbody>
              {favoris.map((serie, i) => (
                <tr key={serie.imdbID}>
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
                      className="btn btn-danger"
                      onClick={() => supprimerFav(i)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Film;
