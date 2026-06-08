interface BgImageProps {
    mode: boolean;
    id: number;
    refresh?: boolean;
    image: string;
}

export function BgImage({ mode, id, refresh, image }: BgImageProps) {

    return (<div className="bg-[url(./assets/HomePageBannerPhoto.jpg)] bg-cover bg-center min-h-[40vw] w-full flex flex-col justify-around">
        {mode ? (<></>)
        : (<></>)}
    </div>

    )
}