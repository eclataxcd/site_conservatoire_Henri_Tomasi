export function Button({text}: {text: string}) {
    return (
        <button className="py-2 px-8 border-1 border-brown rounded 
        shadow-button bg-white text-pink font-montserrat font-bold whitespace-pre-line
        delay-50 duration-200 hover:bg-pink hover:text-white ">
            {text}
        </button>
    );
}