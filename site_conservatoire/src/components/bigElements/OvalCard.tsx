import { Button } from '../smallElements/Button';

export function OvalCard({ title, btn }: { title: string; btn: string }) {

    const titleClass = 'text-xs italic font-montserrat text-light-green';


    return (
        <div className="bg-[url(./assets/ovalCard.jpg)] bg-cover bg-center rounded-full shadow-card w-70 h-110 cursor-pointer hover:shadow-card-hover transition-shadow duration-300">
            <div className="p-10 flex flex-col justify-end items-center h-full gap-5">
                <h3 className="text-5xl text-light-green font-bodoni">
                    {title}
                </h3>

                <Button text={btn}></Button>

            </div>
        </div>
    );
}