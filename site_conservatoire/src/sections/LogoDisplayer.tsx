import { Image } from '../components/smallElements/Image';

export function LogoDisplayer({ mode }: { mode: boolean }) {
    return (
        <div className='flex flex-row gap-5'>
            <Image mode={mode} src="logo.png" alt="logo" hauteur='30' />
            <Image mode={mode} src="logo.png" alt="logo" hauteur='30' />
            <Image mode={mode} src="logo.png" alt="logo" hauteur='30' />
            <Image mode={mode} src="logo.png" alt="logo" hauteur='30' />
            
        </div>
    );
}