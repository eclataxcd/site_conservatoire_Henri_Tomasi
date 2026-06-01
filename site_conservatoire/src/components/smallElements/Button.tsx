interface ButtonProps {
    texte?: string, 
    couleur?: string,
    style?: string, 
    type?: string,
    elem_action?: () => void; 
    
}

export function Button({ texte, couleur, style, type, elem_action }: ButtonProps) {

    const styles = style + " " + couleur + " py-2 px-8 border-1 border-brown rounded shadow-button bg-white text-pink font-montserrat font-bold whitespace-pre-line cursor-pointer delay-50 duration-200 hover:bg-pink hover:text-white"
    return (
        <>
            {type === undefined ? (
                <button className={styles} onClick={() => { elem_action }}>
                    {texte}
                </button>) 
                :
                (<input className={styles} type={type} value={texte} />)
            }
        </>


    );
}