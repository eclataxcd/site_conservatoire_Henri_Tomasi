import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface HomePageTitleProps {
    id: number;
    mode: boolean;
    texte: string;
    nom_elem: string;
    couleur: string;
    reload: () => void;
}

export function HomePageTitle({ id, mode, texte, nom_elem, couleur, reload }: HomePageTitleProps) {
    // états pour changer les attributs de l'élément
    const [text, setText] = useState(texte)
    const [color, setColor] = useState(couleur)

    // action lorsqu'on sauvegarde les changements
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // On construit l'objet avec les clés exactes attendues par ta BDD
        const payload = {
            texte: text,
            couleur: color
        };

        updateElement(payload);
    };

    // appel à l'api pour sauvegarder les changements
    const updateElement = async (payload: object) => {
        try {
            const response = await fetch(`http://localhost:5000/api/content/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // On précise bien qu'on envoie du JSON
                },
                body: JSON.stringify(payload), // On sérialise notre objet
            });

            const data = await response.json();
            console.log('Element mis à jour :', data);
            reload();
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    // action pour la suppression
    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/api/content/element/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            reload()
        } catch (err) {
            console.error("Erreur lors de la suppression de l'image")
        }
    };

    return (
        <>
            {mode ? (
                <form onSubmit={handleSubmit} className='w-full flex flex-col items-end '>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='text-6xl text-[var(--color-txt)] font-bodoni font-bold w-4/5 text-right lg:text-6xl' style={{
                        ['--color-txt' as any]: `${color}`,
                    }} />
                    <label className='bg-white rounded p-1 text-xs'>{nom_elem}</label>
                    <input type="color" onChange={(e) => (setColor(e.target.value))} className="p-1 border rounded-md focus:ring-1" />
                    <span>
                        <button type="submit" className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Save color='#2dd248' /></button>
                        <button type="button" onClick={handleDelete} className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Trash2 color='#d22d2d' /></button>
                    </span>
                </form>
            ) : (
                <h1 className='text-6xl text-[var(--color-txt)] font-bodoni font-bold w-4/5 text-right lg:text-8xl' style={{
                    ['--color-txt' as any]: `${couleur}`,
                }}>
                    {text}
                </h1>)}
        </>


    );
}