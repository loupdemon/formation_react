import PropTypes from 'prop-types';

/*
en Typescript
interface IpropsFilms {
    affiche: string;       // URL de l'image de la série
    titre: string;         // Titre de la série
    description: string;   // Description de la série
    note: number;          // Note de la série
    qui: (indice: number) => void;  // Fonction pour gérer l'index (quand on clique sur une vignette)
}
*/
//function Vignette({ affiche, titre, description, note, qui }: IpropsFilms) {
//function Vignette({ affiche, titre, description, note, onClick }) {
function Vignette(props) {
    const {affiche, titre, description, note, indice, qui} = props;

   return (
    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-2">
      <div className="card h-100">
        <img src={affiche} className="card-img-top" alt={titre} />
        <div className="card-body">
          <h5 className="card-title">{titre}</h5>
          <p className="card-text">{description}</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">{note} / 5</small>
        </div>
      </div>
      <button  onClick={()=> qui(indice)} style={{ cursor: 'pointer' }} className='btn btn-primary'>récupérer le lien streaming(en indice consoel)</button>
    </div>
  );
}
// Validation des props avec PropTypes
Vignette.propTypes = {
    affiche: PropTypes.string.isRequired,        // La prop 'affiche' doit être une chaîne de caractères
    titre: PropTypes.string.isRequired,          // La prop 'titre' doit être une chaîne de caractères
    description: PropTypes.string.isRequired,    // La prop 'description' doit être une chaîne de caractères
    note: PropTypes.number.isRequired,           // La prop 'note' doit être un nombre
    indice:PropTypes.number.isRequired, 
    qui: PropTypes.func.isRequired,          // La prop 'qui' doit être une fonction
};

export default Vignette;
