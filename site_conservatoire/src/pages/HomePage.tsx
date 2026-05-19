import { NavBar } from '../components/other/NavBar';
import { HomePageBanner } from '../sections/HomePageBanner';

export function HomePage() {

    const titre = "Conservatoire de Corse Henri Tomasi";
    const sousTitre = "Etablissement d'enseignement artistique spécialisé, \n Bastia, Aiacciu è Corte";
    const texteBtn1 = "Démarrer \n l'inscription";
    const texteBtn2 = "Accéder à \n l'extranet";
    const textePartenaires = "Partenaires";

    return (
        <div className='w-full min-h-screen bg-whiteBg'>
            <NavBar />
            <HomePageBanner textes={[titre, sousTitre, texteBtn1, texteBtn2, textePartenaires]}></HomePageBanner>
            
            <br /><br />
            
        </div>

    );
}   