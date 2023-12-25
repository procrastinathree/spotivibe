import { FC } from "react";
import { Button, buttonVariants } from "./button";
import SpotifyIcon from "../icons/SpotifyIcon";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";


interface WelcomeHeaderProps {

}

const WelcomeHeader: FC<WelcomeHeaderProps> = () => {
    return (
        <div className="flex flex-col w-full gap-16 px-32 py-16 col">
            <div className="flex flex-col items-center gap-2">
                <h1 className="flex items-center gap-2 text-5xl font-bold">
                    <span className="text-primary-foreground">Welcome to</span>
                    <span className="px-4 py-2 rounded-lg bg-secondary text-slate-900">Spotivibe</span>
                </h1>
                <h5 className="text-2xl font-bold text-slate-500">Spotivibe is a cutting-edge music app that takes your music experience to the next level.</h5>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-8">
                <div className="w-1/3">
                    <Carousel className="w-fit">
                        <CarouselContent className="w-fit">
                            <CarouselItem className="font-semibold text-center w-fit text-slate-500">View your spotify stats (+number of plays)</CarouselItem>
                            <CarouselItem className="font-semibold text-center w-fit text-slate-500">Share them with anyone</CarouselItem>
                            <CarouselItem className="font-semibold text-center w-fit text-slate-500">Compare your taste with friends</CarouselItem>
                            <CarouselItem className="font-semibold text-center w-fit text-slate-500">Promote your playlist</CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {/* this button is to authorize with spotify */}
                    <a href="" type="button" className={buttonVariants({className:"!text-2xl py-8 flex gap-4", size:"lg"})}>
                        <SpotifyIcon size={32} />
                        Sign in with Spotify
                    </a>
                </div>
            </div>
        </div>
    );
}

export default WelcomeHeader;