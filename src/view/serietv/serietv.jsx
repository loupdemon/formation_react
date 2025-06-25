import React, { useState, useEffect } from 'react';
import Vignette from '../../component/vignette/vignette';
import data from './data.json'; // Importer le fichier JSON

function SerieTV() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        // Charger les séries depuis le fichier JSON et mettre à jour l'état
        setFilms(data.series);
    }, []);

    const qui = (index) => {
        console.log(index);
        console.log(films[index]);
    };

    return (
        <div className="row">
            {films.map((item, index) => (
                <div key={index}  className="col-6">
                    <Vignette
                        affiche={item.url}          
                        titre={item.titre}         
                        description={item.description[0]}  
                        note={item.note} 
                        
                        indice={index}
                        qui={qui}  
                    />
                </div>
            ))}
        </div>
    );
}

export default SerieTV;
