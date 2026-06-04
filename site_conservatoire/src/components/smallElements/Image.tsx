import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ImageProps {
    mode: boolean;
    src: string;
    alt: string;
    hauteur?: string;
    longueur?: string;
    id: string;
}

export function Image({ mode, src, alt, hauteur, longueur, id }: ImageProps) {
    const [imageAlt, setImageAlt] = useState(alt);
    const [imageHauteur, setImageHauteur] = useState(hauteur);
    const [imageLongueur, setImageLongueur] = useState(longueur);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        updateElement(formData);

    };

    const updateElement = async (formData: FormData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/update/element/${id}`, {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
            console.log('Element mis à jour :', data);

        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    

    return (<>
        {!mode ? (
            <img src={src} alt={alt} className={"h-" + hauteur + " w-" + longueur} />
        ) : (
            <form onSubmit={handleSubmit} className={longueur ? "w-" + longueur : "w-" + hauteur}>
                <img src={src} alt={alt} className={"h-" + hauteur + " w-" + longueur} />
                <input type="file" name="image" accept="image/*" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-30" />
                <input value={imageAlt} type="text" name="alt" placeholder="Texte alternatif" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-30" />
                <input value={imageHauteur} type="number" name="hauteur" placeholder="Hauteur" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-15" />
                <input value={imageLongueur} type="number" name="longueur" placeholder="Longueur" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-15" />
                <button type="submit" className="p-1 border rounded-md bg-white text-xs"><Save color='#2dd248' /></button>
                <button type="button" className="p-1 border rounded-md bg-white text-xs"><Trash2 color='#d22d2d' /></button>
            </form>

        )}
    </>


    );
}