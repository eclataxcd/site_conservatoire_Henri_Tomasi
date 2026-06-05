import { useState } from 'react';
import dictionnaireElements from '../../ListElements';
import { Button } from "../smallElements/Button";

export function DynamicForm({ idPage, setRefresh }: { idPage: string, setRefresh: ()=>(void) }) {
    const [position, setPosition] = useState("");
    const [elementSelectionne, setElementSelectionne] = useState(dictionnaireElements[0]);
    const [valeursParametres, setValeursParametres] = useState<Record<string, string>>({});

    const handleSelectChange = (e: any) => {
        const cible = dictionnaireElements.find(el => el.balise === e.target.value);
        if (cible) {
            setElementSelectionne(cible);
            setValeursParametres({}); // Réinitialise les champs saisis
        }
    };

    const handleInputChange = (cleParametre: string, valeur: any) => {
        setValeursParametres(prev => ({
            ...prev,
            [cleParametre]: valeur
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // 1. Préparation de l'objet de données global
        // On fusionne l'ordre (la position) et la balise avec le reste des champs (nom, texte, couleur, etc.)
        const bodyData = {
            balise: elementSelectionne.balise,
            ordre: Number(position),
            ...valeursParametres
        };

        // 2. Détermination de l'endpoint selon le type d'élément
        const type = elementSelectionne.type;

        try {
            await fetch(`http://localhost:5000/api/pages/${idPage}/${type}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            alert(`${elementSelectionne.nomAffichage} ajouté avec succès !`);

            // Réinitialisation du formulaire après succès
            setPosition("");
            setValeursParametres({});
            setRefresh();

        } catch (error: any) {
            console.error("Erreur lors de la soumission :", error);
            alert(`Oops ! ${error.message}`);
        }
    };

    return (
        <>
            {idPage === "" ?
                (<></>) :

                (<div className="p-4 max-w-md bg-white rounded-xl shadow">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* LE SELECT POUR CHOISIR L'ÉLÉMENT À AJOUTER */}
                        <div className="flex flex-col gap-1">
                            <label className="font-montserrat font-semibold">Choisir un élément ou une section :</label>
                            <select
                                value={elementSelectionne.balise}
                                onChange={handleSelectChange}
                                className="p-2 border rounded-md"
                            >
                                {dictionnaireElements.map((element) => (
                                    <option key={element.balise} value={element.balise}>
                                        {element.nomAffichage} ({element.balise})
                                    </option>
                                ))}
                            </select>
                            <input required value={position} onChange={(e) => setPosition(e.target.value)} type="number" placeholder="Position dans la page" className="p-1 border rounded-md focus:ring-1" />
                        </div>
                        <hr className="border-t border-brown" />


                        {/* LES INPUTS DYNAMIQUES (générés selon l'élément sélectionné) */}
                        <div className="flex flex-col gap-2">
                            <h3 className="font-semibold font-montserrat">
                                Paramètres à remplir :
                            </h3>

                            {elementSelectionne.parametres.map((param) => (
                                <div key={param.cle} className="flex flex-col gap-1">
                                    <label className="text-sm font-medium font-montserrat">{param.label}</label>
                                    <input
                                        type={param.type}
                                        value={valeursParametres[param.cle] || ''}
                                        onChange={(e) => handleInputChange(param.cle, e.target.value)}
                                        className="p-2 border rounded-md focus:ring-1"
                                    />
                                </div>
                            ))}
                        </div>

                        <Button texte="Ajouter" type="submit" />

                    </form>
                </div>)}
        </>


    );
}