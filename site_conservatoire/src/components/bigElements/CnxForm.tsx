import { useState, useEffect } from "react";
import { InputForm } from "../smallElements/InputForm";
import { Button } from "../smallElements/Button";

export function CnxForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authentification = async (e: any) => {
        e.preventDefault(); // <-- Bloque le rechargement de la page de base d'un formulaire HTML

        try {
            // Conseil : Pour un Login, on utilise généralement 'POST' et non 'GET' si on envoie un body
            const response = await fetch(`/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log('Réponse du serveur :', data);
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    return (
        <div className="p-10 bg-white w-1/2 h-auto flex flex-col m-auto mt-30 items-center rounded-lg">
            <h1 className="p-3 font-bodoni font-bold text-5xl text-green">Espace Admin</h1>
            <form onSubmit={authentification} className="w-full flex flex-col items-center" >
                <InputForm
                    value={email}
                    onChange={setEmail}
                    text="Identifiant"
                    type="text"
                    id="id"
                />

                <InputForm
                    value={password}
                    onChange={setPassword}
                    text="Mot de passe"
                    type="password"
                    id="password"
                /><br /><br />
                <Button text="Se connecter" type="submit" />
            </form>
        </div>

    );
}