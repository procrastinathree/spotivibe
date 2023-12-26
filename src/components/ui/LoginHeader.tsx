import { FC } from "react";
import { buttonVariants } from "./button";
import SpotifyIcon from "../icons/SpotifyIcon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";


interface LoginHeaderProps {

}

const CLIENT_ID = '8aec2f843ca04ed68b481bc73cf1792e';  
const REDIRECT_URI = 'http://localhost:5173/profile'; 
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = ['playlist-modify-private', 'playlist-read-private']; 

const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

const LoginHeader: FC<LoginHeaderProps> = () => {
    return (
        <div className="flex flex-col w-full gap-16 px-32 py-16 col">
            <div className="flex flex-col items-center gap-2">
                <h1 className="flex items-center gap-2 text-5xl font-bold">
                    <span className="text-primary-foreground">Welcome to</span>
                    <span className="px-4 py-2 rounded-lg bg-secondary text-neutral-900">Spotivibe</span>
                </h1>
                <h5 className="text-2xl font-bold text-neutral-500">Spotivibe is a cutting-edge music app that takes your music experience to the next level.</h5>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-8">
                <div className="w-1/3">
                    <Carousel className="w-fit">
                        <CarouselContent className="w-fit">
                            <CarouselItem className="font-semibold text-center w-fit text-neutral-500">View your spotify stats (+number of plays)</CarouselItem>
                            <CarouselItem className="font-semibold text-center w-fit text-neutral-500">Share them with anyone</CarouselItem>
                            <CarouselItem className="font-semibold text-center w-fit text-neutral-500">Compare your taste with friends</CarouselItem>
                            <CarouselItem className="font-semibold text-center w-fit text-neutral-500">Promote your playlist</CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {/* this button is to authorize with spotify */}
                    <a href={loginUrl} type="button" className={buttonVariants({className:"!text-2xl py-8 flex gap-4", size:"lg"})}>
                        <SpotifyIcon size={32} />
                        Sign in with Spotify
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginHeader;