import { CnxForm } from '../components/bigElements/CnxForm';
import { NavBar } from '../components/other/NavBar';

export function Admin() {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Logique de soumission du formulaire d'ajout d'utilisateur
    }

    return (
        <div className='w-full h-screen bg-whiteBg'>
            <NavBar />
            <CnxForm />
            
        </div>
    );
}