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
const SCOPES = ['playlist-modify-private', 'playlist-read-private', 'user-read-currently-playing', 'user-read-playback-state'];

const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

const LoginHeader: FC<LoginHeaderProps> = () => {
    return (
        <div className="flex flex-col w-full gap-16 px-32 py-16 col">
            <div className="flex flex-col items-center gap-2">
                <h1 className="flex items-center gap-2 text-5xl font-bold">
                    <span className="text-primary-foreground">Welcome to</span>
                    <span className="px-4 py-2 rounded-lg bg-secondary text-neutral-900">Spotivibe</span>
                </h1>
                <h5 className="text-xl text-center mx-auto font-bold text-neutral-300">Spotivibe is a web application that enhances your Spotify experience by creating playlists, tracking your Spotify activity, and more.</h5>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-8">
                <div className="w-1/3">
                    <Carousel className="w-fit">
                        <CarouselContent className="w-fit">
                            <CarouselItem className="font-semibold text-sm text-center w-fit text-neutral-300">Create custom playlists based on your music preferences and favorite tracks</CarouselItem>
                            <CarouselItem className="font-semibold text-sm text-center w-fit text-neutral-300">Keep track of your listening habits and get insights into your music choices</CarouselItem>
                            <CarouselItem className="font-semibold text-sm text-center w-fit text-neutral-300">Access Spotify's vast music library and user data, fun of yourself</CarouselItem>
                            <CarouselItem className="font-semibold text-sm text-center w-fit text-neutral-300">View and manage your Spotivibe user profile and share with others</CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div className="flex flex-col items-center gap-2 mt-42">
                    <a href={loginUrl} type="button" className={buttonVariants({className:"!text-2xl py-8 flex gap-4", size:"sm"})}>
                        <SpotifyIcon size={32} />
                        <p className="text-base font-bold">Sign in with Spotify</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginHeader;