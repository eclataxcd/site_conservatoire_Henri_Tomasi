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
    const [balises, setBalises] = useState<any[]>([]);


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
        const loadAllComponents = async () => {
            if (!content || content.length === 0) return;

            try {
                const promises = content.map(async (elem: any) => {
                    const data = await getBalise(elem.id_contenu, elem.type);
                    return data ? data[0].balise : null;
                });

                const results = await Promise.all(promises);

                setBalises(results.filter((item): item is string => item !== null));
            } catch (error) {
                console.error("Erreur lors du chargement des balises :", error);
            }
        };

        loadAllComponents();
    }, [content]);

    const getBalise = async (id: any, table: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/content/balise`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, table })
            });

            const data = await response.json();
            console.log(`Balise récupérée pour id ${id} et table ${table} :`, data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération de la balise :', error);
            return null;
        }
    };

    const getPropsElement = async (idElem: any) => {
        try {
            const response = await fetch(`http://localhost:5000/api/content/props`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: idElem })
            });

            const data = await response.json();
            console.log(`Props récupérées pour l'élément avec id ${idElem} :`, data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des props :', error);
            return null;
        }
    };



    return (
        <div className='w-full bg-whiteBg'>
            <NavBar />

            <HomePageBanner mode={mode} bigTitle={titre} setBigTitle={setTitre} smallTitle={sousTitre} setSmallTitle={setSmallTitre} btn1={texteBtn1} btn2={texteBtn2} titlePartners={textePartenaires}></HomePageBanner>



            {balises.map((nomBalise: string, index: number) => {
                console.log(`Traitement de la balise : ${balises[index]} à l'index ${index}`);
                const ComponentToRender = componentRegistry[nomBalise];
                console.log(`Rendu de la balise : ${nomBalise} avec le composant :`, ComponentToRender);

                if (ComponentToRender) {

                    return <ComponentToRender key={index} mode={mode} />;
                }

                return null;
            })}


        </div>

    );
}