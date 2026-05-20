import { Button } from '../components/smallElements/Button';

export function HomePageBanner({ bigTitle, smallTitle, btn1, btn2, titlePartners }: { bigTitle: string; smallTitle: string; btn1: string; btn2: string; titlePartners: string;}) {
    return (
        <div className="bg-[url(./assets/HomePageBannerPhoto.jpg)] bg-cover bg-center min-h-[40vw] w-full flex flex-col justify-around">

            <div className='bg-[url(./assets/logo_vert.png)] bg-contain bg-no-repeat w-full h-[70%] flex flex-col items-end '>

                <h1 className='text-6xl text-white font-bodoni font-bold w-4/5 text-right lg:text-8xl'>
                    {bigTitle}
                </h1>
                <h2 className='text-3xl text-white font-montserrat text-right w-3/5 lg:text-4xl'>
                    {smallTitle}
                </h2>

            </div>

            <div className='w-full flex flex-row justify-between items-center flex-wrap'>

                <div className='flex flex-row gap-10'>
                    <Button style='ml-10' text={btn1} ></Button>
                    <Button text={btn2}></Button>
                </div>
                

                <div>
                    <h4 className='text-light-green font-bold font-bodoni text-4xl p-3'>{titlePartners}</h4>
                    <div className='flex flex-row gap-5'>
                        <img src="logo.png" alt="" className='w-30' />
                        <img src="logo.png" alt="" className='w-30' />
                        <img src="logo.png" alt="" className='w-30' />
                        <img src="logo.png" alt="" className='w-30' />
                    </div>
                </div>
                
            </div>



        </div>
    );

}