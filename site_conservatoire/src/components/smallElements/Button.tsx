interface ButtonProps {
    text: string, 
    style?: string, 
    type?: string,
    onClick?: () => void; 
}

export function Button({ text, style, type, onClick }: ButtonProps) {

    const styles = style + " py-2 px-8 border-1 border-brown rounded shadow-button bg-white text-pink font-montserrat font-bold whitespace-pre-line cursor-pointer delay-50 duration-200 hover:bg-pink hover:text-white"
    return (
        <>
            {type === undefined ? (
                <button className={styles} onClick={() => { onClick }}>
                    {text}
                </button>) 
                :
                (<input className={styles} type={type} value={text} />)
            }
        </>


    );
}