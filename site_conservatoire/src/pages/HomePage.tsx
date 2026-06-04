import { NavBar } from '../components/other/NavBar';
import { HomePageBanner } from '../sections/HomePageBanner';
import { HomePageDisplayCard } from '../sections/HomePageDisplayCard';
import { useEffect, useState } from 'react';
import { Button } from '../components/smallElements/Button';
import { Space } from '../components/smallElements/Space';

interface HomePageProps {
    mode: boolean;
}

const componentRegistry: Record<string, React.ComponentType<any>> = {
    "Button": Button,
    "HomePageBanner": HomePageBanner,
    "Space": Space,
    "HomePageDisplayCard": HomePageDisplayCard,
};

export function HomePage({ mode }: HomePageProps) {
    const [content, setContent] = useState<any[]>([]);
    const [componentsToRender, setComponentsToRender] = useState<any[]>([]);


    const [titre, setTitre] = useState("Conservatoire de Corse Henri Tomasi");
    const [sousTitre, setSmallTitre] = useState("Etablissement d'enseignement artistique spécialisé, \n Bastia, Aiacciu è Corte");
    const [texteBtn1, setTexteBtn1] = useState("Démarrer \n l'inscription");
    const [texteBtn2, setTexteBtn2] = useState("Accéder à \n l'extranet");
    const [textePartenaires, setTextePartenaires] = useState("Partenaires");

    useEffect(() => {
        const getAllContent = async (id: number) => {
            try {
                const response = await fetch(`http://localhost:5000/api/content/${id}`, {
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
        getAllContent(1);
    }, []);


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

            <HomePageBanner id={1} mode={mode} bigTitle={titre} setBigTitle={setTitre} smallTitle={sousTitre} setSmallTitle={setSmallTitre} btn1={texteBtn1} btn2={texteBtn2} titlePartners={textePartenaires}></HomePageBanner>



           {componentsToRender.map((component: any, index: number) => {
                const ComponentToRender = componentRegistry[component.nom];

                if (ComponentToRender) {
                    // On injecte les propriétés SQL directement ({...component.props}) 
                    // Tout en conservant la propriété globale 'mode'
                    return <ComponentToRender key={index} mode={mode} {...component.props} />;
                }

                return null;
            })}


        </div>

    );
}