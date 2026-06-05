import { HomePageBanner } from './sections/HomePageBanner';
import { HomePageDisplayCard } from './sections/HomePageDisplayCard';
import { Button } from './components/smallElements/Button';
import { Space } from './components/smallElements/Space';
import { HomePage } from './pages/HomePage';
import { Admin } from './pages/Admin';
import { AboutUs } from './pages/AboutUs'
import { HomePageSmallTitle } from './components/smallElements/HomePageSmallTitle';
import { HomePageTitle } from './components/smallElements/HomePageTitle';
import { Image } from './components/smallElements/Image';
import { InputForm } from './components/smallElements/InputForm';
import { LogoDisplayer } from './sections/LogoDisplayer';


// Enregistrement de toutes les balises
const componentRegistry: Record<string, React.ComponentType<any>> = {
    "AboutUs": AboutUs,
    "Admin": Admin,
    "HomePage": HomePage,    

    "HomePageBanner": HomePageBanner,
    "HomePageDisplayCard": HomePageDisplayCard,
    "LogoDisplayer": LogoDisplayer,

    "Button": Button,
    "HomePageSmallTitle": HomePageSmallTitle,
    "HomePageTitle": HomePageTitle,
    "Image": Image,
    "InputForm": InputForm,
    "Space": Space,
  
};


export default componentRegistry;