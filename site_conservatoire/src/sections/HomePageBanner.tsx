import { useState, useEffect } from 'react';
import componentRegistry from '../RegisteredElements'

interface HomePageBannerProps {
    id: number;
    mode: boolean;
}

export function HomePageBanner({ id, mode }: HomePageBannerProps) {
    // États pour stocker le contenu de la section, les composants à afficher et savoir si on doit rafraichir la section
    const [content, setContent] = useState<any[]>([]);
    const [componentsToRender, setComponentsToRender] = useState<any[]>([]);

    // useEffect pour récupérer le contenu (éléments et sections) de la section depuis la base de données
    useEffect(() => {
        const getContent = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:5000/api/content/section/${id}`, {
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

    return (
        <>
            {componentsToRender.map((component: any) => {
                const ComponentToRender = componentRegistry[component.nom];

                if (ComponentToRender) {
                    return <ComponentToRender mode={mode} id={component.id} {...component.props} />;
                }

                return null;
            })}
        </>
    );

}