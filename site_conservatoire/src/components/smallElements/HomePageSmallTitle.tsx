interface HomePageSmallTitleProps {
    mode: boolean;
    text: string;
    setText: (value: string) => void;
}

export function HomePageSmallTitle({ mode, text, setText }: HomePageSmallTitleProps) {

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <>
            {mode ? (<form onSubmit={handleSave} className='w-full flex flex-col items-end '>
                <textarea value={text} onChange={(e) => setText(e.target.value)}
                    className='text-3xl text-white font-montserrat text-right w-full lg:text-4xl'>

                </textarea>
                <button type="submit" className="cursor-pointer">Sauvegarder</button>
            </form>
            ) : (<h2 className='text-3xl text-white font-montserrat text-right w-3/5 lg:text-4xl'>
                {text}
            </h2>)}
        </>
    );
}