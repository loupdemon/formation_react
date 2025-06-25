import { useState } from 'react';
import Appareil from '../../component/appareil/appareil';
import useLocalStorage from '../../hooks/useLocalStorage';

const EMOJIS = ['🎮', '☕', '🎲', '📺', '🔌', '💡', '🔧'];

function Domotique() {
  const [appareils, setAppareils] = useLocalStorage("domotiqueAppareil", [
    { icon: '🎮', nom: 'PlayStation 5', etat: true },
    { icon: '☕', nom: 'Machine à café', etat: false },
    { icon: '🎲', nom: 'Xbox', etat: false }
  ]);

  const [iconTemp, setIconTemp] = useState('');

  const onAjoute = (e) => {
    e.preventDefault();
    const nom = e.target.produit.value.trim();
    if (!nom) return;

    setAppareils(prev => [
      ...prev,
      { icon: iconTemp || '🔧', nom, etat: false }
    ]);
    setIconTemp('');
    e.target.reset();
  };

  const handleClick = (index) => {
    setAppareils(prev =>
      prev.map((app, i) =>
        i === index ? { ...app, etat: !app.etat } : app
      )
    );
  };

  const removeStorageAppareil = () => {
    setAppareils([]);
  };

  return (
    <div className="container">
      <form onSubmit={onAjoute} className="mb-4">
        <div className="mb-2">
          <label htmlFor="produit">Ajouter un appareil</label>
          <input
            id="produit"
            name="produit"
            placeholder="Nom appareil"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Sélectionnez une icône :</label>
          <div className="emoji-grid">
            {EMOJIS.map((emo, i) => (
              <button
                type="button"
                key={i}
                className={`emoji-btn${iconTemp === emo ? ' selected' : ''}`}
                onClick={() => setIconTemp(emo)}
              >
                {emo}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary me-2">Ajouter</button>
        <button type="button" className="btn btn-danger" onClick={removeStorageAppareil}>
          Supprimer mes Appareils
        </button>
      </form>

      <div className="row">
        {appareils.map((item, index) => (
          <Appareil
            key={index}
            icon={item.icon}
            nom={item.nom}
            etat={item.etat}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Domotique;
