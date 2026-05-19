import { Button } from '../components/smallElements/Button';

export function HomePageBanner({ textes }: { textes: string[] }) {
    return (
        <div className="bg-[url(./assets/HomePageBannerPhoto.jpg)] bg-cover bg-center h-[45vw] w-full">

            <div className='bg-[url(./assets/logo_vert.png)] bg-contain bg-no-repeat w-full h-[70%] flex flex-col items-end '>

                <h1 className='text-6xl text-white font-bodoni font-bold w-4/5 text-right lg:text-8xl'>
                    {textes[0]}
                </h1>
                <h2 className='text-3xl text-white font-montserrat text-right w-3/5 lg:text-4xl'>
                    {textes[1]}
                </h2>

            </div>



            <Button text={textes[2]}></Button>
            <Button text={textes[3]}></Button>

            <h4 className='text-light-green font-bold font-bodoni text-4xl'>{textes[4]}</h4>
            <div>
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
            </div>
        
        </div>
    );

}