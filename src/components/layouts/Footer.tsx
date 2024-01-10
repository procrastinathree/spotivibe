import { FC } from "react";
import { CardDescription, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { NavLink } from "react-router-dom";
import { InstagramIcon, TwitterIcon } from "lucide-react";

interface FooterProps {

}

const Footer: FC<FooterProps> = () => {
    return (
        <footer className="container mx-auto flex flex-col gap-8 mb-8 p-4 dark">
            <Separator />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col w-full md:w-2/5 gap-6">
                    <div className="flex flex-col gap-4">
                        <CardTitle className="text-lg">Spotivibe</CardTitle>
                        <p className="text-sm font-semibold text-neutral-100">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus eius quis ad recusandae rem adipisci modi. Similique voluptatibus porro eos.</p>
                    </div>
                    <CardDescription className="text-sm font-semibold">
                        Music data, artist images, album covers, and song previews are provided by Spotify. Spotify is a trademark of Spotify AB.
                    </CardDescription>
                </div>
                <div className="w-1/2 md:w-1/4">
                    <CardDescription className="text-base font-semibold">Global</CardDescription>
                    <div className="flex flex-col gap-2">
                        <NavLink to={"/most-followed-artists"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Most Followed Artist</NavLink>
                        <NavLink to={"/most-popular-artists"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Most Popular Artist</NavLink>
                        <NavLink to={"/most-popular-songs"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Most Popular Songs</NavLink>
                        <NavLink to={"/most-popular-albums"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Most Popular Albums</NavLink>
                    </div>
                </div>
                <div className="w-1/2 md:w-1/4">
                    <CardDescription className="text-base font-semibold">More</CardDescription>
                    <div className="flex flex-col gap-2">
                        <NavLink to={"/blog"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Blog</NavLink>
                        <NavLink to={"/terms-of-service"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Terms of Service</NavLink>
                        <NavLink to={"/privacy-policy"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Privacy Policy</NavLink>
                        <NavLink to={"/permissions"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Permissions</NavLink>
                        <NavLink to={"/contact"} className="font-semibold text-neutral-100 hover:text-primary w-fit">Contact</NavLink>
                    </div>
                </div>
                <div className="w-1/2 md:w-1/4">
                    <CardDescription className="text-base font-semibold">Connect</CardDescription>
                    <div className="flex flex-col gap-2">
                        <NavLink to={"/most-followed-artists"} className="flex items-center gap-2 font-semibold w-fit text-neutral-100 hover:text-primary">
                            <TwitterIcon size={16} />
                            <span>Twitter</span>
                        </NavLink>
                        <NavLink to={"/most-popular-artists"} className="flex items-center gap-2 font-semibold w-fit text-neutral-100 hover:text-primary">
                            <InstagramIcon size={16} />
                            <span>Instagram</span>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="flex flex-wrap justify-center gap-6">
                <div className="text-center">
                    <CardTitle className="text-base font-bold">Spotivibe is developed by</CardTitle>
                    <CardDescription className="text-base font-semibold hover:underline"><a href="https://github.com/procrastinathree" target="_blank">Procrastinathree</a></CardDescription>
                </div>
            </div>
        </footer>
    );
}

export default Footer;