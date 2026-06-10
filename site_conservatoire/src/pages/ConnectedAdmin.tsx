import { useEffect, useState } from "react";
import { AdminLeftSide } from "../components/bigElements/AdminLeftSide";
import { DynamicForm } from "../components/bigElements/DynamicForm";

import componentRegistry from "../RegisteredElements"


export function ConnectedAdmin({ connected, setConnexion }: { connected: boolean, setConnexion: (value: boolean) => void }) {
    const [idPage, setIdPage] = useState("");
    const [balise, setBalise] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false); 
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

    const refreshPage=() => {setRefreshTrigger(!refreshTrigger)}

    return (
        <div className="flex flex-row min-h-full bg-whiteBg">

            <AdminLeftSide onClickElem={setIdPage} />

            <div className="w-full flex flex-col items-center">
                <div className="w-full ">
                    {ComponentToRender ? (
                        <ComponentToRender mode={connected} idPage={idPage} refresh={refreshTrigger} />
                    ) : (
                        <p className="text-center py-10">Sélectionnez une page pour voir son contenu.</p>
                    )}
                </div>

                <DynamicForm id={idPage} setRefresh={refreshPage} insertInto="page"/>

            </div>
        </div>
    );
}