import { FC } from "react";
import { CardDescription, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";
import { InstagramIcon, TwitterIcon } from "lucide-react";

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {
    return (
        <footer className="container flex flex-col gap-8 mb-8 dark">
            <Separator />
            <div className="flex gap-8">
                <div className="flex flex-col w-2/5 gap-6">
                    <div className="flex flex-col gap-4">
                        <CardTitle className="text-lg">Spotivibe</CardTitle>
                        <p className="text-sm font-semibold text-slate-100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus eius quis ad recusandae rem adipisci modi. Similique voluptatibus porro eos.</p>
                    </div>
                    <CardDescription className="text-sm font-semibold">
                        Music data, artist images, album covers, and song previews are provided by Spotify. Spotify is a trademark of Spotify AB.
                    </CardDescription>
                </div>
                <div className="flex flex-col w-1/5 gap-4">
                    <CardDescription className="text-base font-semibold">Global</CardDescription>
                    <div className="flex flex-col gap-2">
                        <NavLink to={"/most-followed-artists"} className="font-semibold text-slate-100 hover:text-primary">Most Followed Artist</NavLink>
                        <NavLink to={"/most-popular-artists"} className="font-semibold text-slate-100 hover:text-primary">Most Popular Artist</NavLink>
                        <NavLink to={"/most-popular-songs"} className="font-semibold text-slate-100 hover:text-primary">Most Popular Songs</NavLink>
                        <NavLink to={"/most-popular-albums"} className="font-semibold text-slate-100 hover:text-primary">Most Popular Albums</NavLink>
                    </div>
                </div>
                <div className="flex flex-col w-1/5 gap-4">
                    <CardDescription className="text-base font-semibold">More</CardDescription>
                    <div className="flex flex-col gap-2">
                        <NavLink to={"/blog"} className="font-semibold text-slate-100 hover:text-primary">Blog</NavLink>
                        <NavLink to={"/terms-of-service"} className="font-semibold text-slate-100 hover:text-primary">Terms of Service</NavLink>
                        <NavLink to={"/privacy-policy"} className="font-semibold text-slate-100 hover:text-primary">Privacy Policy</NavLink>
                        <NavLink to={"/permissions"} className="font-semibold text-slate-100 hover:text-primary">Permissions</NavLink>
                        <NavLink to={"/contact"} className="font-semibold text-slate-100 hover:text-primary">Contact</NavLink>
                    </div>
                </div>
                <div className="flex flex-col w-1/5 gap-4">
                    <CardDescription className="text-base font-semibold">Connect</CardDescription>
                    <div className="flex flex-col gap-2">
                        <NavLink to={"/most-followed-artists"} className="flex items-center gap-2 font-semibold text-slate-100 hover:text-primary">
                            <TwitterIcon size={16} />
                            <span>Twitter</span>
                        </NavLink>
                        <NavLink to={"/most-popular-artists"} className="flex items-center gap-2 font-semibold text-slate-100 hover:text-primary">
                            <InstagramIcon size={16} />
                            <span>Instagram</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="flex justify-end gap-6">
                <div className="flex gap-2">
                    <CardTitle className="text-base font-bold">5.6M</CardTitle>
                    <CardDescription className="text-base font-semibold">Artist</CardDescription>
                </div>
                <div className="flex gap-2">
                    <CardTitle className="text-base font-bold">5.6M</CardTitle>
                    <CardDescription className="text-base font-semibold">Songs</CardDescription>
                </div>
                <div className="flex gap-2">
                    <CardTitle className="text-base font-bold">5.6M</CardTitle>
                    <CardDescription className="text-base font-semibold">Albums</CardDescription>
                </div>
                <div className="flex gap-2">
                    <CardTitle className="text-base font-bold">5.6M</CardTitle>
                    <CardDescription className="text-base font-semibold">Genres</CardDescription>
                </div>
                <div className="flex gap-2">
                    <CardTitle className="text-base font-bold">5.6M</CardTitle>
                    <CardDescription className="text-base font-semibold">Labels</CardDescription>
                </div>
                <div className="flex gap-2">
                    <CardTitle className="text-base font-bold">5.6M</CardTitle>
                    <CardDescription className="text-base font-semibold">Playlists</CardDescription>
                </div>
            </div>
        </footer>
    );
}

export default Footer;