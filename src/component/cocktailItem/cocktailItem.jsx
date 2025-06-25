// props attend : cocktail, validerPresence, supprimerCocktail
function CocktailItem({ cocktail, validerPresence, supprimerCocktail }) {
    return (
        <tr>
            <td>{cocktail.strDrink}</td>
            <td>{cocktail.strAlcoholic}</td>
            <td>{cocktail.club}</td>
            <td>{cocktail.nomProposePar}</td>
            <td>{cocktail.prix}</td>
            <td>
                <img
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    width={50}
                />
            </td>
            <td>
                <button
                    className={`btn btn-sm me-2 ${
                        cocktail.present ? "btn-success" : "btn-secondary"
                    }`}
                    onClick={() =>
                        validerPresence(cocktail.id, !cocktail.present)
                    }
                >
                    {cocktail.present ? "✅ Présent" : "❌Absent"}{" "}
                </button>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => supprimerCocktail(cocktail.id)}
                >
                    Supprimer
                </button>
            </td>
        </tr>
    );
}

export default CocktailItem;
