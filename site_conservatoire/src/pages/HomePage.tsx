import { NavBar } from '../components/other/NavBar';
import { useEffect, useState } from 'react';

import componentRegistry from '../RegisteredElements'

interface HomePageProps {
    mode: boolean;
    idPage: number;
    refresh?:boolean;
}

export function HomePage({ mode, idPage, refresh }: HomePageProps) {
    // États pour stocker le contenu de la page et les composants à afficher
    const [content, setContent] = useState<any[]>([]);
    const [componentsToRender, setComponentsToRender] = useState<any[]>([]);


    // useEffect pour récupérer le contenu (éléments et sections) de la page depuis la base de données
    useEffect(()=>{
        const getAllContent = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:5000/api/content/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setContent(data);
            console.log("Contenu récupéré :", data);
        } catch (error) {
            console.error('Erreur lors de la récupération du sommaire :', error);
        }
    };
    getAllContent(idPage);
    },[refresh])
    

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
                        body: JSON.stringify({ id: elem.id_contenu, table: elem.type })
                    });
                    const baliseData = await baliseResponse.json();

                    // On extrait le nom textuel (ex: "Button") depuis la ligne ou le premier index du tableau
                    const nomBalise = Array.isArray(baliseData) ? baliseData[0]?.balise : baliseData?.balise;

                    if (!nomBalise) return null;

                    let proprietes = {};

                    // 💡 SI C'EST UN ELEMENT : On va chercher ses props spécifiques dans la table element
                    if (elem.type === "element") {
                        const propsResponse = await fetch(`http://localhost:5000/api/content/props`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: elem.id_contenu })
                        });
                        const propsData = await propsResponse.json();
                        // On extrait l'objet de propriétés (la ligne SQL)
                        proprietes = Array.isArray(propsData) ? propsData[0] : propsData;
                    }

                    // On retourne un objet unique contenant l'association parfaite Balise <-> Props
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

    return (
        <div className='w-full bg-whiteBg'>
            <NavBar />
            {/* Affiche le contenu */}
            {componentsToRender.map((component: any) => {
                const ComponentToRender = componentRegistry[component.nom];

                if (ComponentToRender) {
                    return <ComponentToRender mode={mode} {...component.props} />;
                }

                return null;
            })}


        </div>

    );
}