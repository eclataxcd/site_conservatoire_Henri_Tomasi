import { Button } from "../components/smallElements/Button";
import { useEffect, useState } from "react";
import { AdminLeftSide } from "../components/bigElements/AdminLeftSide";
import { HomePage } from "./HomePage";
import { DynamicForm } from "../components/bigElements/DynamicForm";

const componentRegistry: Record<string, React.ComponentType<any>> = {
    "HomePage": HomePage
};


export function ConnectedAdmin({ connected, setConnexion }: { connected: boolean, setConnexion: (value: boolean) => void }) {
    const [idPage, setIdPage] = useState("0");
    const [balise, setBalise] = useState("");
    const ComponentToRender = balise ? componentRegistry[balise] : null;

    useEffect(() => {
        const getPageBalise = async (id: any) => {

            try {
                const response = await fetch(`http://localhost:5000/api/pages/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log(data.balise);
                setBalise(data.balise);

            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
            }
        }
        getPageBalise(idPage);
    }, [idPage]);


    return (
        <div className="flex flex-row min-h-full bg-whiteBg">

            <AdminLeftSide onClickElem={setIdPage} />

            <div className="w-full flex flex-col items-center">
                <div className="w-full ">
                    {ComponentToRender ? (
                        <ComponentToRender mode={connected} />
                    ) : (
                        <p className="text-center py-10">Sélectionnez une page pour voir son contenu.</p>
                    )}
                </div>

                <DynamicForm idPage={idPage} />
                {/* faire en sorte que lorsqu'on clique sur une page ça affiche le formulaire, en passant l'id de la page en props */}



            </div>
        </div>
    );
}