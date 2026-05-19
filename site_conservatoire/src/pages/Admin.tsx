import { NavBar } from '../components/other/NavBar';

export function Admin() {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Logique de soumission du formulaire d'ajout d'utilisateur
    }

    return (
        <>
            <NavBar />
            <h1>Ajout d'utilisateur</h1>

            <form onSubmit={(e)=> handleSubmit(e)} >

                <label htmlFor="name">Nom</label>
                <br />
                <input className='border-2 rounded-lg' id='name' name='name' type="text" />
                <br />

            </form>
        </>
    );
}