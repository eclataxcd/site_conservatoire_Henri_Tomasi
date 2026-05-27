import { CnxForm } from '../components/bigElements/CnxForm';
import { ConnectedAdmin } from './ConnectedAdmin';

export function Admin() {

    let login = false;

    return (
        <div className='w-full h-screen bg-whiteBg'>
            
            {login ? (<CnxForm connected={login}/>) : 
            (<ConnectedAdmin connected={login}/>)}            
        </div>
    );
}