import { Save, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import componentRegistry from '../../RegisteredElements'

interface BgImageProps {
    nom_elem: string;
    mode: boolean;
    image: string;
    id: number;
    reload: () => (void);
}

export function BgImage({ nom_elem, mode, image, id, reload, }: BgImageProps) {
    // états pour changer les attributs de l'élément
    const [imageSrc, setImageSrc] = useState(image)
    // États pour stocker le contenu de la section, les composants à afficher et savoir si on doit rafraichir la section
    const [content, setContent] = useState<any[]>([]);
    const [componentsToRender, setComponentsToRender] = useState<any[]>([]);

    // useEffect pour récupérer le contenu (éléments et sections) de l'élément depuis la base de données
    useEffect(() => {
        const getContent = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:5000/api/content/element/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const data = await response.json();
                console.log("Contenu récupéré :", data);
                setContent(data);
            } catch (error) {
                console.error('Erreur lors de la récupération du sommaire :', error);
            }
        };
        getContent(id);
    }, []);

    // useEffect pour, une fois le contenu récupéré, associer à chaque contenu sa balise et ses propriétés si c'est un élément
    useEffect(() => {
        const loadComponentsAndProps = async () => {
            if (!content || content.length === 0) return;

            try {
                const promises = content.map(async (elem: any) => {
                    // Récupération de la balise (valable pour section et element)
                    const baliseResponse = await fetch(`http://localhost:5000/api/content/balise`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: elem.id_elem, table: "element" })
                    });
                    const baliseData = await baliseResponse.json();

                    // On extrait le nom textuel (ex: "Button") depuis la ligne ou le premier index du tableau
                    const nomBalise = Array.isArray(baliseData) ? baliseData[0]?.balise : baliseData?.balise;

                    if (!nomBalise) return null;

                    let proprietes = {};
                    const propsResponse = await fetch(`http://localhost:5000/api/content/props`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: elem.id_elem })
                    });
                    const propsData = await propsResponse.json();
                    proprietes = Array.isArray(propsData) ? propsData[0] : propsData;


                    return {
                        nom: nomBalise,
                        props: proprietes || {}
                    };
                });

                const results = await Promise.all(promises);
                setComponentsToRender(results.filter(item => item !== null));
            } catch (error) {
                console.error("Erreur lors du chargement des composants :", error);
            }
        };

        loadComponentsAndProps();
    }, [content]);

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


    return (<div className="bg-[image:var(--custom-bg)] bg-cover bg-center min-h-[40vw] w-full flex flex-col justify-around"
        style={{
            ['--custom-bg' as any]: `url(${imageSrc})`,
        }}>
        {!mode ? (<>
            {componentsToRender.map((component: any, index: number) => {
                const ComponentToRender = componentRegistry[component.nom];

                if (ComponentToRender) {
                    // On injecte les propriétés SQL directement ({...component.props}) 
                    // Tout en conservant la propriété globale 'mode'
                    return <ComponentToRender key={index} mode={mode} {...component.props} />;
                }

                return null;
            })}</>
        ) : (
            <>
                <form onSubmit={handleSubmit} className="w-20">
                    <label className='bg-white rounded p-1 text-xs'>{nom_elem}</label>
                    <input type="file" name="image" accept="image/*" onChange={(e) => handleFileChange(e)} className="p-1 border rounded-md focus:ring-1 bg-white text-xs w-30" />
                    <button type="submit" className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Save color='#2dd248' /></button>
                    <button type="button" onClick={handleDelete} className="p-1 border rounded-md bg-white text-xs cursor-pointer"><Trash2 color='#d22d2d' /></button>
                </form>
                {componentsToRender.map((component: any, index: number) => {
                    const ComponentToRender = componentRegistry[component.nom];

                    if (ComponentToRender) {
                        // On injecte les propriétés SQL directement ({...component.props}) 
                        // Tout en conservant la propriété globale 'mode'
                        return <ComponentToRender key={index} mode={mode} {...component.props} />;
                    }

                    return null;
                })}

            </>)}
    </div>

    )
}