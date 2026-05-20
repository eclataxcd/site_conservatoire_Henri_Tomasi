import { NavBar } from '../components/other/NavBar';
import { HomePageBanner } from '../sections/HomePageBanner';
import { Card } from '../components/bigElements/Card';

export function HomePage() {

    const titre = "Conservatoire de Corse Henri Tomasi";
    const sousTitre = "Etablissement d'enseignement artistique spécialisé, \n Bastia, Aiacciu è Corte";
    const texteBtn1 = "Démarrer \n l'inscription";
    const texteBtn2 = "Accéder à \n l'extranet";
    const textePartenaires = "Partenaires";

    const date = "12/12/2024";
    const location = "Bastia";
    const title = "Concert de Noël";
    const description = "Venez assister à notre concert de Noël avec des performances exceptionnelles de nos étudiants et professeurs.";
    const imageUrl = "./src/assets/HomePageBannerPhoto.jpg";

    return (
        <div className='w-full min-h-screen bg-whiteBg'>
            <NavBar />
            <HomePageBanner textes={[titre, sousTitre, texteBtn1, texteBtn2, textePartenaires]}></HomePageBanner>
            
            <br /><br />

            <Card date={date} location={location} title={title} description={description} imageUrl={imageUrl}></Card>
            
            
        </div>

    );
}   