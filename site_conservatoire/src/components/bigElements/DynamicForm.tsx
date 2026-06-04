import { useState } from 'react';
import dictionnaireElements from '../../ListElements';
import { Button } from "../smallElements/Button";

export function DynamicForm({idPage}: {idPage: string}) {
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Élément à créer :", elementSelectionne.balise);
        console.log("Paramètres configurés :", valeursParametres);
    };

    return (
        <>
            {idPage === "0" ?
                (<></>) :

                (<div className="p-4 max-w-md bg-white rounded-xl shadow">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* LE SELECT POUR CHOISIR L'ÉLÉMENT À AJOUTER */}
                        <div className="flex flex-col gap-1">
                            <label className="font-montserrat font-semibold">Choisir un élément :</label>
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