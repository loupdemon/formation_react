import React, { useRef, useState } from 'react';
import '../../App.css';
import animation from '../../../public/vehicule.gif'
import tractor from '../../../public/tractor.gif';
import  download from '../../../public/escargo.gif';

function Conso() {
  const littre = useRef('');
  const distance = useRef('');
  const [consommation, setConsommation] = useState(null);
  const [etatConsommation, setEtatConsommation] = useState("");
  const [commentConsommation, setCommentConsommation] = useState("");
  const [imageAfficher, setImageAfficher]=useState(download);


  const afficher = () => {
    const l = parseFloat(littre.current.value);
    const d = parseFloat(distance.current.value);

    if (!isNaN(l) && !isNaN(d) && d > 0) {
      const conso = (100 * l) / d;
      setConsommation(conso.toFixed(2));
      setEtatConsommation(conso < 6.5 ? 'success' : 'warning');
      setCommentConsommation(conso < 6.5 ? 'TU es écolo et Riche 🌵🌳' : 'Critère 3 ou 4 , mais Bravo pour le recyclage🚜')
      setImageAfficher(conso < 6.5 ? animation : tractor)
    } else {
      setConsommation(null);
      setEtatConsommation("");
      setCommentConsommation("")
      setImageAfficher(download);
    }
  };

  return (
    <div className="container border mt-4 mb-4 col-6 pb-4 pt-4">
      <h1 className="h3">Calculer votre Consommation</h1>
      <form>
        <label>Littre d'essence</label>
        <input ref={littre} placeholder="quantité en L" className="form-control my-2" onChange={afficher} />
        <label>Distance</label>
        <input ref={distance} placeholder="Distance en Km" className="form-control my-2" onChange={afficher} />
      </form>
      <div className={`alert alert-${etatConsommation} mt-4`}>
        {consommation !== null && <h4>Conso: {consommation} Litres/100km</h4>}
        {commentConsommation}
      </div>
      <img src={imageAfficher} alt="consommation vehicule" width="100%" height="100%" className="me-2" />

    </div>
  );
}

export default Conso;
