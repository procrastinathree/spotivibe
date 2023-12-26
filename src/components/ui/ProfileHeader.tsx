import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CardTitle } from "./card";
import { buttonVariants } from "./button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpotifyIcon from "../icons/SpotifyIcon";
interface ProfileHeaderProps {

}

const ProfileHeader: FC<ProfileHeaderProps> = () => {
    const token = localStorage.getItem("spotifyAuthToken")
    const { data } = useQuery({
        queryKey: ['me'],
        queryFn: async () => await axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${token}` } })
    })
    console.log(data?.data.followers.total)

    return (
        <div className="flex justify-between">
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex justify-between">
                    <div className="flex items-end">
                        <img src={data?.data.images[1].url} alt="profile photo" className="w-40 h-40 border-4 rounded-full border-neutral-100 bg-neutral-950 text-neutral-500" />
                        <h1 className="px-4 text-4xl font-semibold text-primary-foreground">{data?.data.display_name ?? ""}</h1>
                    </div>
                    <div className="flex flex-col items-end gap-2 px-4">
                        <a href={data?.data.external_urls.spotify} className="flex items-center gap-2 font-semibold hover:text-primary text-primary-foreground">
                            <SpotifyIcon size={16} />
                            <span>
                                Open in spotify
                            </span>
                        </a>
                        <span className="font-semibold text-primary-foreground">{data?.data.followers.total} Followers</span>
                        <div className="flex items-center gap-4 p-2 rounded-lg bg-primary">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle className="text-base text-primary-foreground">Song Title</CardTitle>
                                <CardTitle className="text-base">Ed Sheeran</CardTitle>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Overview</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/songs">Songs</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/artists">Artists</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/albums">Albums</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/genres">Genres</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/labels">Labels</NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;