import { Button } from '../components/smallElements/Button';
import { HomePageTitle } from '../components/smallElements/HomePageTitle';
import { HomePageSmallTitle } from '../components/smallElements/HomePageSmallTitle';

interface HomePageBannerProps {
    mode: boolean;
    bigTitle: string;
    setBigTitle: (value: string) => void;
    smallTitle: string;
    setSmallTitle: (value: string) => void;
    btn1: string;
    btn2: string;
    titlePartners: string;
}

export function HomePageBanner({ mode, bigTitle, setBigTitle, smallTitle, setSmallTitle, btn1, btn2, titlePartners }: HomePageBannerProps) {
    return (
        <div className="bg-[url(./assets/HomePageBannerPhoto.jpg)] bg-cover bg-center min-h-[40vw] w-full flex flex-col justify-around">

            <div className='bg-[url(./assets/logo_vert.png)] bg-contain bg-no-repeat w-full h-[70%] flex flex-col items-end '>

                <HomePageTitle mode={mode} text={bigTitle} setText={setBigTitle}/>
                <HomePageSmallTitle mode={mode} text={smallTitle} setText={setSmallTitle}/>

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