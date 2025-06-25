import React, { useState } from 'react';


function Imc() {

  const [imc, setImc] = useState(null);
  const [remarque, setRemarque] = useState('normal');
  const [etat, setEtat]= useState({
      etatAlerte: "",
      etatButton: "success"
  })


 const onCalcule = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const tailleM = parseFloat(formData.get('taille'));
  const poidsKg = parseFloat(formData.get('poids'));

  if (isNaN(tailleM) || isNaN(poidsKg) || tailleM <= 0 || poidsKg <= 0) {
    setImc('Valeurs invalides');
    setRemarque('Valeurs invalides');
    return;
  }

  const valeurImc = poidsKg / (tailleM * tailleM);
  const valeurArrondie = valeurImc.toFixed(2);
  setImc(valeurArrondie);

  const remarqueTexte = valeurImc < 18 ? '🫨 Maigre' :
                        valeurImc < 25 ? '😍 Normal' : '🥵 Gros';
  setRemarque(remarqueTexte);

  let styleColor = {
     etatAlerte: "",
     etatButton:"success"
  }

  //const styleAlerte = valeurImc >= 18 && valeurImc < 25 ? 'success' : 'danger';
  //setEtat(styleAlerte);

  styleColor.etatAlerte = valeurImc >= 18 && valeurImc < 25 ? 'success' : 'danger';
  styleColor.etatButton= valeurImc >= 18 && valeurImc < 25 ? 'info' : 'warning';
  setEtat(styleColor)

};
  
  return (
    <>

      <div className="container border mb-4 mt-4 col-6 pb-4 pt-4">
        <h1 className="h3">Calculer votre IMC</h1>
        <form onSubmit={onCalcule}>
          <label for="poids">Poids en kg.</label>
          <input name="poids" placeholder="Poids (kg)" className="form-control my-2" />
          <label for="poids">Taille en mètre</label>
          <input name="taille" placeholder="Taille (m)" className="form-control my-2" />
          <button type="submit" className={`btn btn-${etat.etatButton }`}>Calculer IMC</button>
        </form>
        <div className={`alert alert-${etat.etatAlerte} mt-4`}>          
          {imc !== null && (
                <h4>Votre IMC : {imc}</h4>
              )}
              {remarque !== null && (
                <h4>Vous êtes : {remarque}</h4>
              )}
          </div>
        </div>
    </>
  );
}

export default Imc;
