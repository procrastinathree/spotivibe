import { FC } from "react";
import { Button } from "./button";

interface WelcomeHeaderProps {

}

const WelcomeHeader: FC<WelcomeHeaderProps> = () => {
    return (
        <div className="flex flex-col w-full gap-16 px-32 py-16 col">
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-2xl font-bold text-primary">Welcome to Spotivibe</h1>
                <h5 className="text-lg font-bold text-slate-500">Unleash your experience</h5>
            </div>
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-2">
                    <div className="px-2 py-1 rounded-sm bg-primary w-fit text-md text-primary-foreground">View your spotify stats (+number of plays)</div>
                    <div className="px-2 py-1 rounded-sm bg-primary w-fit text-md text-primary-foreground">Share them with anyone</div>
                    <div className="px-2 py-1 rounded-sm bg-primary w-fit text-md text-primary-foreground">Compare your taste with friends</div>
                    <div className="px-2 py-1 rounded-sm bg-primary w-fit text-md text-primary-foreground">Promote your playlist</div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    {/* this button is to authorize with spotify */}
                    <Button type="button">Sign in with Spotify</Button>
                    <h5 className="font-bold text-md text-slate-500">To see your stats!</h5>
                </div>
            </div>
        </div>
    );
}

export default WelcomeHeader;