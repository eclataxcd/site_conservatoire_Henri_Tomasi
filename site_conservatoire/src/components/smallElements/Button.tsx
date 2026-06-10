import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ButtonProps {
    id?: number;
    mode?: boolean;
    nom_elem?: string;
    texte: string,
    couleur?: string,
    couleur2?: string,
    style?: string,
    type?: string,
    elem_action?: () => void;
    reload?: () => void;

}

export function Button({ id, mode, texte, nom_elem, couleur, couleur2, style, type, elem_action, reload }: ButtonProps) {
    // états pour changer les attributs de l'élément
    const [text, setText] = useState(texte)
    const [color, setColor] = useState(couleur)
    const [color2, setColor2] = useState(couleur2)

    // action lorsqu'on sauvegarde les changements
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // On construit l'objet avec les clés exactes attendues par ta BDD
        const payload = {
            texte: text,
            couleur: color,
            couleur2: color2
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

    const styles = style + " py-2 px-8 border-1 border-black rounded shadow-button bg-[var(--color-bg)] text-[var(--color-txt)] font-montserrat font-bold whitespace-pre-line cursor-pointer delay-50 duration-200 hover:bg-[var(--color-txt)] hover:text-[var(--color-bg)]"
    return (
        <>
            {!mode ? (type === undefined ? (
                <button className={styles} onClick={() => { elem_action }} style={{
                    ['--color-txt' as any]: `${color}`,
                    ['--color-bg' as any]: `${color2}`
                }}>
                    {texte}
                </button>)
                :
                (<input className={styles} type={type} value={texte} style={{
                    ['--color-txt' as any]: `${color}`,
                    ['--color-bg' as any]: `${color2}`
                }} />)
            ) : (
                <form onSubmit={handleSubmit} className='w-full flex flex-col items-start'>
                    <input className={styles} type='text' value={text} onChange={(e) => setText(e.target.value)} style={{
                        ['--color-txt' as any]: `${color}`,
                        ['--color-bg' as any]: `${color2}`
                    }} />
                    <span>
                        <label className='bg-white rounded p-1 text-xs'>{nom_elem}</label>
                        <input type="color" value={color} onChange={(e) => (setColor(e.target.value))} className="p-1 border rounded-md focus:ring-1" />
                        <input type="color" value={color2} onChange={(e) => (setColor2(e.target.value))} className="p-1 border rounded-md focus:ring-1" />
                        <button type="submit" className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Save color='#2dd248' /></button>
                        <button type="button" onClick={handleDelete} className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Trash2 color='#d22d2d' /></button>
                    </span>
                </form>
            )}
        </>


    );
}