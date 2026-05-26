
export function ConnectedAdmin({connected}: {connected: boolean}) {
    return (
        <div className="p-10 bg-white w-1/2 h-auto flex flex-col m-auto mt-30 items-center rounded-lg"> 
            <h1 className="p-3 font-bodoni font-bold text-5xl text-green">Espace Admin</h1>
            <p className="p-3 font-montserrat text-2xl text-center">Vous êtes connecté en tant qu'administrateur.</p>
        </div>
    );
}