import { NavBar } from '../components/other/NavBar';
import { HomePageBanner } from '../sections/HomePageBanner';
import { HomePageDisplayCard } from '../sections/HomePageDisplayCard';
import { useEffect, useState } from 'react';

export function HomePage( mode: boolean = false) {
    const [titre, setTitre] = useState("Conservatoire de Corse Henri Tomasi");
    const [sousTitre, setSmallTitre] = useState("Etablissement d'enseignement artistique spécialisé, \n Bastia, Aiacciu è Corte");
    const [texteBtn1, setTexteBtn1] = useState("Démarrer \n l'inscription");
    const [texteBtn2, setTexteBtn2] = useState("Accéder à \n l'extranet");
    const [textePartenaires, setTextePartenaires] = useState("Partenaires");

   
    return (
        <div className='w-full bg-whiteBg'>
            <NavBar />
            <HomePageBanner mode={mode} bigTitle={titre} setBigTitle={setTitre} smallTitle={sousTitre} setSmallTitle={setSmallTitre} btn1={texteBtn1} btn2={texteBtn2} titlePartners={textePartenaires}></HomePageBanner>
            
            <br /><br />

            <HomePageDisplayCard ovalCard={false} sectionTitle='Dernières actualités du conservatoire' btn='Voir toutes les actualités du conservatoire'></HomePageDisplayCard>
            <HomePageDisplayCard ovalCard={true} sectionTitle='Découvrez nos cursus' btn=''></HomePageDisplayCard>
            <HomePageDisplayCard ovalCard={false} sectionTitle='Saison culturelle du conservatoire' btn='Voir tous les évènements du conservatoire'></HomePageDisplayCard>
            <HomePageDisplayCard ovalCard={false} sectionTitle='Médiation culturelle du conservatoire' btn='Voir tous les évènements du conservatoire'></HomePageDisplayCard>
            
            
        </div>

    );
}