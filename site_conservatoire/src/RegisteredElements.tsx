import { HomePageBanner } from './sections/HomePageBanner';
import { HomePageDisplayCard } from './sections/HomePageDisplayCard';
import { Button } from './components/smallElements/Button';
import { Space } from './components/smallElements/Space';
import { HomePage } from './pages/HomePage';
import { Admin } from './pages/Admin';


// Enregistrement de toutes les balises
const componentRegistry: Record<string, React.ComponentType<any>> = {
    "HomePage": HomePage,
    "Admin": Admin,
    "Recruitment": Admin,

    "HomePageBanner": HomePageBanner,
    "HomePageDisplayCard": HomePageDisplayCard,

    "Button": Button,
    "Space": Space,

    
};


export default componentRegistry;