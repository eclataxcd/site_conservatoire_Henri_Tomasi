export function Button({text, style}: {text: string, style?: string}) {

    const styles = style + " py-2 px-8 border-1 border-brown rounded shadow-button bg-white text-pink font-montserrat font-bold whitespace-pre-line cursor-pointer delay-50 duration-200 hover:bg-pink hover:text-white"
    return (
        <button className={styles}>
            {text}
        </button>
    );
}