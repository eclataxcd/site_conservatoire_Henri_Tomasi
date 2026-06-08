import { Button } from '../components/smallElements/Button';
import { HomePageTitle } from '../components/smallElements/HomePageTitle';
import { HomePageSmallTitle } from '../components/smallElements/HomePageSmallTitle';
import { LogoDisplayer } from './LogoDisplayer';
import { useState, useEffect } from 'react';
import componentRegistry from '../RegisteredElements'

interface HomePageBannerProps {
    id: number;
    mode: boolean;
    refresh?:boolean;
}

export function HomePageBanner({ id, mode, refresh }: HomePageBannerProps) {
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
        <div className="bg-[url(./assets/HomePageBannerPhoto.jpg)] bg-cover bg-center min-h-[40vw] w-full flex flex-col justify-around">

            {componentsToRender.map((component: any, index: number) => {
                const ComponentToRender = componentRegistry[component.nom];

                if (ComponentToRender) {
                    // On injecte les propriétés SQL directement ({...component.props}) 
                    // Tout en conservant la propriété globale 'mode'
                    return <ComponentToRender key={index} mode={mode} {...component.props} />;
                }

                return null;
            })}


            <div className='bg-[url(./assets/logo_vert.png)] bg-contain bg-no-repeat w-full h-[70%] flex flex-col items-end '>

                <HomePageTitle mode={mode} text={bigTitle} setText={setBigTitle} />
                <HomePageSmallTitle mode={mode} text={smallTitle} setText={setSmallTitle} />

            </div>

            <div className='w-full flex flex-row justify-between items-center flex-wrap'>

                <div className='flex flex-row gap-10'>
                    <Button style='ml-10' texte={btn1} ></Button>
                    <Button texte={btn2}></Button>
                </div>


                <div>
                    <h4 className='text-light-green font-bold font-bodoni text-4xl p-3'>{titlePartners}</h4>
                    <LogoDisplayer mode={mode}/>
                </div>

            </div>



        </div>
    );

}