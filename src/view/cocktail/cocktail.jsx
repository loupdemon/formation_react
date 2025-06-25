import React, { useEffect, useState } from "react";
import CocktailItem from "../../component/cocktailItem/cocktailItem.jsx";

const FIREBASE_URL =
    "https://test-f9bc9-default-rtdb.europe-west1.firebasedatabase.app";

function CocktailsList() {
    const [cocktails, setCocktails] = useState([]);

    //pour l'ajout
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        strDrink: "",
        strAlcoholic: "",
        club: "",
        nomProposePar: "",
        prix: "",
        strDrinkThumb: "",
    });

    useEffect(() => {
        fetch(`${FIREBASE_URL}/cocktails.json`)
            .then((res) => res.json())
            .then((data) => {
                if (!data) return setCocktails([]);
                // Convertir l'objet clé/valeur en tableau avec id
                const liste = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                setCocktails(liste);
            })
            .catch((err) => console.error("Erreur chargement cocktails", err));
    }, []);

    /*
      useEffect(() => {
        axios.get(`${FIREBASE_URL}/cocktails.json`)
            .then((response) => {
                const data = response.data;
                if (!data) return setCocktails([]);
                // Convertir l'objet clé/valeur en tableau avec id
                const liste = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                setCocktails(liste);
            })
            .catch((err) => console.error("Erreur chargement cocktails", err));
    }, []);
    */

    // Fonction pour valider la présence (ex: mise à jour locale + Firebase)
    const validerPresence = (id, isPresent) => {
        console.log(`Cocktail ${id} est ${isPresent ? "présent" : "absent"}`);

        // Exemple: mettre à jour localement pour l'UI (facultatif)
        setCocktails((prev) =>
            prev.map((c) => (c.id === id ? { ...c, present: isPresent } : c))
        );

        // Si tu veux enregistrer dans Firebase, tu peux faire un PATCH :
        fetch(`${FIREBASE_URL}/cocktails/${id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ present: isPresent }),
        }).catch((err) => console.error("Erreur update présence", err));
    };

    /*
    // Fonction pour valider la présence (mise à jour locale + Firebase)
    const validerPresence = (id, isPresent) => {
        console.log(`Cocktail ${id} est ${isPresent ? "présent" : "absent"}`);

        setCocktails((prev) =>
            prev.map((c) => (c.id === id ? { ...c, present: isPresent } : c))
        );

        // Mise à jour avec axios en PATCH
        axios.patch(`${FIREBASE_URL}/cocktails/${id}.json`, { present: isPresent })
            .catch((err) => console.error("Erreur update présence", err));
    };
    */

    //function d'jout une persone et cockail
    /*
    const ajouterCocktail = (cocktail) => {
        console.log("Ajout cocktail:", cocktail);
        // Ajouter le cocktail à l'état local
        setCocktails((prev) => [...prev, cocktail]);
        // Enregistrer dans Firebase
        fetch(`${FIREBASE_URL}/cocktails.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cocktail),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Cocktail ajouté avec ID:", data.name);
                // Mettre à jour l'ID du cocktail ajouté
                setCocktails((prev) =>
                    prev.map((c) =>
                        c.id === cocktail.id ? { ...c, id: data.name } : c
                    )
                );
            })
            .catch((err) => console.error("Erreur ajout cocktail", err));
    };*/
    const ajouterCocktail = (cocktail) => {
        fetch(`${FIREBASE_URL}/cocktails.json`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cocktail),
        })
            .then((res) => res.json())
            .then((data) => {
                setCocktails((prev) => [
                    ...prev,
                    { ...cocktail, id: data.name, present: false },
                ]);
                setShowModal(false);
                setFormData({
                    strDrink: "",
                    strAlcoholic: "",
                    club: "",
                    nomProposePar: "",
                    prix: "",
                    strDrinkThumb: "",
                });
            })
            .catch((err) => console.error("Erreur ajout cocktail", err));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation simple (ajoute si besoin)
        if (!formData.strDrink || !formData.prix) {
            alert("Merci de remplir au moins le nom et le prix");
            return;
        }
        ajouterCocktail(formData);
    };

    //supprimer un cocktail
    const supprimerCocktail = (id) => {
        if (!window.confirm("Supprimer ce cocktail ?")) return;

        // Supprimer localement
        setCocktails((prev) => prev.filter((c) => c.id !== id));

        // Supprimer de Firebase
        fetch(`${FIREBASE_URL}/cocktails/${id}.json`, {
            method: "DELETE",
        }).catch((err) => console.error("Erreur suppression cocktail", err));
    };

    return (
        <div className="container mt-4">
            <h2>Liste des cocktails</h2>
            <button
                className="btn btn-primary mb-3"
                onClick={() => setShowModal(true)}
            >
                Ajouter un cocktail
            </button>

            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: 20,
                            borderRadius: 8,
                            width: "90%",
                            maxWidth: 400,
                        }}
                    >
                        <h3>Ajouter un cocktail</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label>Nom du cocktail</label>
                                <input
                                    type="text"
                                    name="strDrink"
                                    value={formData.strDrink}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label>Type (Alcoholic / Non-Alcoholic)</label>
                                <input
                                    type="text"
                                    name="strAlcoholic"
                                    value={formData.strAlcoholic}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <label>Club</label>
                                <input
                                    type="text"
                                    name="club"
                                    value={formData.club}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <label>Proposé par</label>
                                <input
                                    type="text"
                                    name="nomProposePar"
                                    value={formData.nomProposePar}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <label>Prix (€)</label>
                                <input
                                    type="number"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleChange}
                                    className="form-control"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label>URL image</label>
                                <input
                                    type="text"
                                    name="strDrinkThumb"
                                    value={formData.strDrinkThumb}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="d-flex justify-content-end gap-2 mt-3">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Type</th>
                        <th>Club</th>
                        <th>Proposé par</th>
                        <th>Prix (€)</th>
                        <th>Image</th>
                        <th>Présence</th>
                    </tr>
                </thead>
                <tbody>
                    {cocktails.map((cocktail) => (
                        <CocktailItem
                            key={cocktail.id}
                            cocktail={cocktail}
                            validerPresence={validerPresence}
                            supprimerCocktail={supprimerCocktail}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CocktailsList;
