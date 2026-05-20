import { Card } from '../components/bigElements/Card';
import { OvalCard } from '../components/bigElements/OvalCard';
import { Button } from '../components/smallElements/Button';

export function HomePageDisplayCard({ sectionTitle, btn, ovalCard }: { sectionTitle: string, btn: string, ovalCard: boolean }) {
    const date = "12/12/2024";
    const location = "Bastia";
    const title = "Concert de Noël";
    const description = "Venez assister à notre concert de Noël avec des performances exceptionnelles de nos étudiants et professeurs.";
    const imageUrl = "./src/assets/HomePageBannerPhoto.jpg";

    const title2 = "Théâtre";
    const buttonTxt = "Découvrir";

    return (
        <div className='flex flex-col justify-center items-center gap-y-10 pb-10'>
            <h3 className='text-4xl font-bold font-bodoni text-green'>
                {sectionTitle}
            </h3>

            {ovalCard ? (
                <div className='flex flex-row justify-evenly flex-wrap gap-10'>
                    <OvalCard title={title2} btn={buttonTxt}></OvalCard>
                    <OvalCard title={title2} btn={buttonTxt}></OvalCard>
                    <OvalCard title={title2} btn={buttonTxt}></OvalCard>
                </div>
            ) : (
                <>
                <div className='flex flex-row justify-evenly flex-wrap gap-10'>
                    <Card date={date} location={location} title={title} description={description} imageUrl={imageUrl}></Card>
                    <Card date={date} location={location} title={title} description={description} imageUrl={imageUrl}></Card>
                    <Card date={date} location={location} title={title} description={description} imageUrl={imageUrl}></Card>
                    <Card date={date} location={location} title={title} description={description} imageUrl={imageUrl}></Card>
                </div>
                <Button text={btn}></Button>
                </>
                

            )}

           
        </div>


    )
}
