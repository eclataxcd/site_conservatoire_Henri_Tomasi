import { NavBar } from '../components/other/NavBar';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Extranet() {

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [utilisateurs, setUtilisateurs] = useState([]);

    const goToStudentExtranet = (e: any) => {
        e.preventDefault();
        // Logique de connexion à l'extranet étudiant
        useEffect(() => {
            fetch('http://localhost:5000/courses')
                .then(res => res.json())
                .then(data => setUtilisateurs(data))
                .catch(err => console.log(err));
        }, []);

    };


    const sendEmailIdentifiant = async (e: any) => {
        e.preventDefault();
        // Logique d'envoi d'email pour récupérer les identifiants
    }

    return (
        <>
            <NavBar />
            <h1>Bienvenue sur l'Extranet du Conservatoire Henri Tomasi</h1>
            <p>Que vous soyez élève, parent d'élève ou enseignant, connectez-vous ici pour avoir accès a votre planning, coordonnées personnels et bien d'autres fonctionnalitées !  </p>
            <br /><br />
            <form onSubmit={(e) => goToStudentExtranet(e)} className='text-center'>
                <h2>Connectez vous à votre espace personnel</h2> <br />
                <label htmlFor="id">Identifiant</label>
                <br />
                <input className='border-2 rounded-lg' id='id' name='id' type="text" value={id} onChange={(e) => setId(e.target.value)} />
                <br />

                <label htmlFor="password">Mot de passe</label>
                <br />
                <input className='border-2 rounded-lg' id='password' name='password' type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={() => setShowPassword(!showPassword)} type="button">
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
                <br /><br />

                <button className='border-2 rounded-lg' type="submit">Se connecter</button>

            </form>

            <br />
            <hr />
            <br />

            <form onSubmit={(e) => sendEmailIdentifiant(e)} className='text-center'>
                <h2>Mot de passe oublié ?</h2> <br />
                <label htmlFor="email">Entrez votre adresse email pour recevoir vos identifiants</label>
                <br />
                <input className='border-2 rounded-lg' id='email' name='email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br /> <br />
                <button className='border-2 rounded-lg' type="submit">Envoyer</button>
            </form>


        </>

    )
}