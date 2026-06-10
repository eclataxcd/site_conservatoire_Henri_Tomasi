import { Save, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ImageProps {
    nom_elem: string;
    mode: boolean;
    image: string;
    texte: string;
    hauteur?: string;
    longueur?: string;
    id: string;
    reload: () => (void);
}

export function Image({ nom_elem, mode, image, texte, hauteur, longueur, id, reload }: ImageProps) {
    // états pour changer les attributs de l'élément
    const [imageSrc, setImageSrc] = useState(image)
    const [imageAlt, setImageAlt] = useState(texte);
    const [imageHauteur, setImageHauteur] = useState(hauteur);
    const [imageLongueur, setImageLongueur] = useState(longueur);

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result as string);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                // ✨ On utilise await pour extraire la string textuelle de la Promise !
                const base64Value = await convertToBase64(file);

                // On l'enregistre proprement dans l'état
                setImageSrc(base64Value)
            } catch (error) {
                console.error("Erreur lors de la conversion de l'image :", error);
            }
        }
    };

    // action lorsqu'on sauvegarde les changements
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // On construit l'objet avec les clés exactes attendues par ta BDD
        const payload = {
            image: imageSrc,       // La chaîne Base64 mise à jour (ou d'origine)
            texte: imageAlt,       // Le texte alternatif (mappé sur "texte" en BDD)
            hauteur: imageHauteur,
            longueur: imageLongueur
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
    }


    return (<>
        {!mode ? (
            <img src={imageSrc} alt={texte} className="h-[var(--img-height)] w-[var(--img-width)] object-cover"
                style={{
                    ['--img-height' as any]: `${imageHauteur}px`,
                    ['--img-width' as any]: `${imageLongueur}px`
                }} />
        ) : (
            <form onSubmit={handleSubmit} className={longueur ? "w-" + longueur : "w-" + hauteur}>
                <img src={imageSrc} alt={texte} className="h-[var(--img-height)] w-[var(--img-width)] object-cover"
                    style={{
                        ['--img-height' as any]: `${imageHauteur}px`,
                        ['--img-width' as any]: `${imageLongueur}px`
                    }} />
                <label className='rounded p-1 text-xs'>{nom_elem}</label>
                <input type="file" name="image" accept="image/*" onChange={(e) => handleFileChange(e)} className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-30" />
                <input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} type="text" name="alt" placeholder="Texte alternatif" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-30" />
                <input value={imageHauteur} onChange={(e) => setImageHauteur(e.target.value)} type="number" name="hauteur" placeholder="Hauteur" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-15" />
                <input value={imageLongueur} onChange={(e) => setImageLongueur(e.target.value)} type="number" name="longueur" placeholder="Longueur" className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-15" />
                <button type="submit" className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Save color='#2dd248' /></button>
                <button type="button" onClick={handleDelete} className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Trash2 color='#d22d2d' /></button>
            </form>

        )}
    </>


    );
}