import { CnxForm } from '../components/bigElements/CnxForm';
import { ConnectedAdmin } from './ConnectedAdmin';
import { useState } from 'react';

export function Admin() {

    const [login,setLogin] = useState(false);
    const style = !login ? "w-full min-h-screen bg-whiteBg flex items-center justify-center" : "w-full h-screen bg-whiteBg";

    return (
        <div className={style} >
            
            {!login ? (<CnxForm setConnexion={setLogin}/>) : 
            (<ConnectedAdmin connected={login} setConnexion={setLogin}/>)}            
        </div>
    );
}