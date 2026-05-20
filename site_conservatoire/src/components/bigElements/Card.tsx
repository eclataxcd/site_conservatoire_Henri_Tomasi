
export function Card({ date, location, title, description, imageUrl }: { date: string; location: string; title: string; description: string; imageUrl: string }) {
    let color = "text-[#B7B7B7]";
    if (location === "Bastia") {
        color = "text-bastia";
    } else if (location === "Ajaccio") {
        color = "text-ajaccio";
    } else if (location === "Corte") {
        color = "text-corte";
    }

    const locationClass = 'text-sm italic font-montserrat ' + color;
    
    return (
        <div className="bg-white rounded-sm shadow-md w-80 min-h-90 cursor-pointer hover:shadow-2xl transition-shadow duration-300">
            <p className="p-2 text-brown italic font-montserrat font-bold">
                {date}
            </p>
            <img src={imageUrl} alt={title} className=" w-9/10 object-cover m-auto" />
            <div className="p-4">
                <div className="flex justify-between mb-2">
                    <h3 className="text-3xl font-bold font-bodoni">
                        {title}
                    </h3>
                    <p className={locationClass}>
                        {location}
                    </p>
                </div>
                
                <p className="font-montserrat">
                    {description}
                </p>
            </div>
        </div>
    );
}