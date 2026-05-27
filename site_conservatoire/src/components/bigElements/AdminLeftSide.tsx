import { Button } from "../smallElements/Button";
import { useEffect, useState } from "react";

interface AdminLeftSideProps {
    onClickElem: (value: any) => void;
}

export function AdminLeftSide({ onClickElem }: AdminLeftSideProps) {
    const [pages, setPages] = useState([]);
    

    useEffect(() => {
        const getAllPages = async () => {

            try {
                const response = await fetch(`http://localhost:5000/api/pages`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log(data);
                setPages(data);

            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
            }
        };
        getAllPages();
    }, []);

    const getPageClicked = async (id: any) => {

        try {
            const response = await fetch(`http://localhost:5000/api/pages/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            console.log(data.balise);
            onClickElem(data.balise);

        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    };

    return (
        <div className="bg-white w-2/9 h-full shadow-summary flex flex-col items-center">
            <h3 className=" text-4xl text-brown font-bodoni font-bold p-4">Les pages</h3>
            {pages.map((page:any) => (
                <p id={page.id_page} onClick={() => getPageClicked(page.id_page)} className="text-xl font-montserrat p-1 cursor-pointer">
                    {page.nom_page}
                </p>
            ))}
            <br />
            <Button text="Ajouter une page" />
        </div>
    );
}