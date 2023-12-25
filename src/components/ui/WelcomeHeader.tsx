import { FC } from "react";
import { Button } from "./button";
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
                    <span className="px-4 py-2 rounded-lg bg-secondary">Spotivibe</span>
                </h1>
                <h5 className="text-2xl font-bold text-slate-500">Spotivibe is a cutting-edge music app that takes your music experience to the next level.</h5>
            </div>
            <div className="flex flex-col items-center justify-between w-full gap-8">
                <div className="w-1/3">
                    <Carousel className="w-fit">
                        <CarouselContent className="w-fit">
                            <CarouselItem className="text-center w-fit text-primary-foreground">View your spotify stats (+number of plays)</CarouselItem>
                            <CarouselItem className="text-center w-fit text-primary-foreground">Share them with anyone</CarouselItem>
                            <CarouselItem className="text-center w-fit text-primary-foreground">Compare your taste with friends</CarouselItem>
                            <CarouselItem className="text-center w-fit text-primary-foreground">Promote your playlist</CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div className="flex flex-col items-center gap-2">
                    {/* this button is to authorize with spotify */}
                    <Button type="button" size={"lg"} className="flex items-center gap-4 py-8 text-2xl">
                        <SpotifyIcon size={32} />
                        Sign in with Spotify</Button>
                </div>
            </div>
        </div>
    );
}

export default WelcomeHeader;