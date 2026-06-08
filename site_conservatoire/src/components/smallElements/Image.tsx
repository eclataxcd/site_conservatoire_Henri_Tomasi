import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ImageProps {
    mode: boolean;
    image: string;
    texte: string;
    hauteur?: string;
    longueur?: string;
    id: string;
}

export function Image({ mode, image, texte, hauteur, longueur, id }: ImageProps) {
    // états pour changer les attributs de l'élément
    const [imageAlt, setImageAlt] = useState(texte);
    const [imageHauteur, setImageHauteur] = useState(hauteur);
    const [imageLongueur, setImageLongueur] = useState(longueur);

    // action lorsqu'on sauvegarde les changements
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        updateElement(formData);

    };

    // appel à l'api pour sauvegarder les changements
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
console.log("Props de l'image reçues par le composant :", { image, texte, hauteur, longueur });
    return (<>
        {!mode ? (
            <img src={image} alt={texte} className="h-[var(--img-height)] w-[var(--img-width)] object-cover"
                style={{
                    ['--img-height' as any]: `${imageHauteur}px`,
                    ['--img-width' as any]: `${imageLongueur}px`
                }} />
        ) : (
            <form onSubmit={handleSubmit} className={longueur ? "w-" + longueur : "w-" + hauteur}>
                <img src={image} alt={texte} className="h-[var(--img-height)] w-[var(--img-width)] object-cover"
                    style={{
                        ['--img-height' as any]: `${imageHauteur}px`,
                        ['--img-width' as any]: `${imageLongueur}px`
                    }} />
                <input type="file" name="image" accept="image/*" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-30" />
                <input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} type="text" name="alt" placeholder="Texte alternatif" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-30" />
                <input value={imageHauteur} onChange={(e) => setImageHauteur(e.target.value)} type="number" name="hauteur" placeholder="Hauteur" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-15" />
                <input value={imageLongueur} onChange={(e) => setImageLongueur(e.target.value)} type="number" name="longueur" placeholder="Longueur" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-15" />
                <button type="submit" className="p-1 border rounded-md bg-white text-xs"><Save color='#2dd248' /></button>
                <button type="button" className="p-1 border rounded-md bg-white text-xs"><Trash2 color='#d22d2d' /></button>
            </form>

        )}
    </>


    );
}