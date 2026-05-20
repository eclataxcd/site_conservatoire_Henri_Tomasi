import { NavBar } from '../components/other/NavBar';
import { HomePageBanner } from '../sections/HomePageBanner';
import { HomePageDisplayCard } from '../sections/HomePageDisplayCard';

export function HomePage() {

    const titre = "Conservatoire de Corse Henri Tomasi";
    const sousTitre = "Etablissement d'enseignement artistique spécialisé, \n Bastia, Aiacciu è Corte";
    const texteBtn1 = "Démarrer \n l'inscription";
    const texteBtn2 = "Accéder à \n l'extranet";
    const textePartenaires = "Partenaires";

   
    return (
        <div className='w-full bg-whiteBg'>
            <NavBar />
            <HomePageBanner bigTitle={titre}  smallTitle={sousTitre} btn1={texteBtn1} btn2={texteBtn2} titlePartners={textePartenaires}></HomePageBanner>
            
            <br /><br />

            <HomePageDisplayCard ovalCard={false} sectionTitle='Dernières actualités du conservatoire' btn='Voir toutes les actualités du conservatoire'></HomePageDisplayCard>
            <HomePageDisplayCard ovalCard={true} sectionTitle='Découvrez nos cursus' btn=''></HomePageDisplayCard>
            <HomePageDisplayCard ovalCard={false} sectionTitle='Saison culturelle du conservatoire' btn='Voir tous les évènements du conservatoire'></HomePageDisplayCard>
            <HomePageDisplayCard ovalCard={false} sectionTitle='Médiation culturelle du conservatoire' btn='Voir tous les évènements du conservatoire'></HomePageDisplayCard>
            
            
        </div>

    );
}