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
const SCOPES = ['playlist-modify-private', 'playlist-read-private', 'user-top-read',
    'user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state',
    'app-remote-control', 'streaming', 'user-read-recently-played', 'user-read-playback-position',
    'user-read-email', 'user-read-private'
];

const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPES.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

const LoginHeader: FC<LoginHeaderProps> = () => {
    return (
        <div className="flex flex-col w-full gap-8 px-4 md:px-32 py-16">
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl md:text-5xl font-bold mb-2">
                    <span className="text-primary-foreground mx-2">Welcome to</span>
                    <span className="px-4 py-2 rounded-lg bg-secondary text-neutral-900">Spotivibe</span>
                </h1>
                <h5 className="text-base md:text-xl font-bold text-neutral-300">Enhances your Spotify experience by creating playlists, tracking your Spotify activity, and more.</h5>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-8">
                <div className="flex flex-col items-center gap-2">
                    <a href={loginUrl} className={buttonVariants({ className: "text-xl md:text-2xl py-6 md:py-8 flex gap-4", size: "sm" })}>
                        <SpotifyIcon size={32} />
                        <p className="text-base font-bold">Sign in with Spotify</p>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LoginHeader;