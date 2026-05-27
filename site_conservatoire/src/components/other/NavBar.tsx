import { Link } from "react-router-dom";
import { useState } from "react";
import { Logo } from './Logo';
import { Menu } from 'lucide-react';

export function NavBar() {

    const [open, setOpen] = useState(false);


    return (
        <header>
            <div className="flex items-center justify-between h-12 bg-dark-green px-4">
                <Link className="w-10" to="/"><Logo /></Link>

                {/* Menu ordi */}
                <div className="hidden sm:flex gap-4">

                    <Link to="/Conservatoire">Le conservatoire</Link>
                    <Link to="/Evenements">Evenements</Link>
                    <Link to="/Cursus">Les cursus</Link>
                    <Link to="/Antennes">Les antennes</Link>
                    <Link to="/Scolarité">Scolarité</Link>

                </div>
                <div>
                    <button>fdsfdsf</button>
                    <button>fdsfdf</button>
                    <button className=" sm:hidden cursor-pointer" type="button" onClick={() => setOpen(!open)}><Menu /></button>
                </div>
                




            </div>

            {/* Menu tel */}
            {open && (
                <>
                    <div className="flex flex-col items-center gap-4 p-4 sm:hidden">
                        <Link to="/Tarifs">Tarifs</Link>
                        <Link to="/Inscription">Inscription</Link>
                        <Link to="/Extranet">Extranet</Link>
                    </div>
                </>

            )}


        </header>


    );
}