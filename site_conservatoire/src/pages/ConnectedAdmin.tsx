import { Button } from "../components/smallElements/Button";
import { useEffect, useState } from "react";
import { AdminLeftSide } from "../components/bigElements/AdminLeftSide";
import { HomePage } from "./HomePage";

const componentRegistry: Record<string, React.ComponentType<any>> = {
    "HomePage": HomePage
};

export function ConnectedAdmin({ connected }: { connected: boolean }) {
    const [balise, setBalise] = useState("");
    const ComponentToRender = balise ? componentRegistry[balise] : null;

    return (
        <div className="flex flex-row h-full bg-whiteBg">
            <AdminLeftSide onClickElem={setBalise} />

            <div className="w-auto h-full ">
                <div>
                    {ComponentToRender ? (
                        <ComponentToRender mode={connected}/>
                    ) : (
                        <p>Sélectionnez une page pour voir son contenu ou composant inconnu.</p>
                    )}
                </div>
                <Button text="Ajouter un élément" />
                <Button text="Ajouter une section" />

            </div>
        </div>
    );
}