
interface HomePageTitleProps {
    mode: boolean;
    text: string;
    setText: (value: string) => void;
}

export function HomePageTitle({ mode, text, setText}: HomePageTitleProps) {

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            {mode ? (<form onSubmit={handleSave} className='w-full flex flex-col items-end '>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}
                    className='text-6xl text-green font-bodoni font-bold w-4/5 text-right lg:text-6xl' />
                <button type="submit" className="cursor-pointer">Sauvegarder</button>
            </form>
            ) : (<h1 className='text-6xl text-green font-bodoni font-bold w-4/5 text-right lg:text-8xl'>
                {text}
            </h1>)}
        </>


    );
}