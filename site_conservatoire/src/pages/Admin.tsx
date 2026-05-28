import { CnxForm } from '../components/bigElements/CnxForm';
import { ConnectedAdmin } from './ConnectedAdmin';
import { useState } from 'react';

export function Admin() {

    const [login,setLogin] = useState(false);

    return (
        <div className='w-full h-screen bg-whiteBg'>
            
            {!login ? (<CnxForm setConnexion={setLogin}/>) : 
            (<ConnectedAdmin connected={login} setConnexion={setLogin}/>)}            
        </div>
    );
}