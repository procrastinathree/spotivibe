import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { buttonVariants } from "./button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SpotifyIcon from "../icons/SpotifyIcon";
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";
import Cookies from "js-cookie";
import { cx } from "class-variance-authority";

interface ProfileHeaderProps {

}

const ProfileHeader: FC<ProfileHeaderProps> = () => {
    const token = Cookies.get("spotifyAuthToken")
    const location = useLocation()
    const { toast } = useToast()
    const { data: CurrentUser, error: CurrentUserError } = useQuery({
        queryKey: ['CurrentUser'],
        queryFn: async () => await axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${token}` } })
    })

    const { data: CurrentTrack, error: CurrentTrackError } = useQuery({
        queryKey: ['CurrrentTrack'],
        queryFn: async () => await axios.get("https://api.spotify.com/v1/me/player/currently-playing", { headers: { Authorization: `Bearer ${token}` } })
    })

    if (CurrentTrackError) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }

    if (CurrentUserError) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }

    return (
        <div className="flex justify-between mt-8">
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex justify-between">
                    <div className="flex items-end">
                        <img src={CurrentUser?.data.images[1].url} alt="profile photo" className="w-40 h-40 border-4 rounded-full border-neutral-100 bg-neutral-950 text-neutral-500" />
                        <h1 className="px-4 text-4xl font-bold text-primary-foreground">{CurrentUser?.data.display_name ?? ""}</h1>
                    </div>
                    <div className="flex flex-col items-end gap-2 px-4">
                        <a target="_blank" href={CurrentUser?.data.external_urls.spotify} className="flex items-center gap-2 font-semibold hover:text-primary text-primary-foreground">
                            <SpotifyIcon size={16} />
                            <span>
                                Open in spotify
                            </span>
                        </a>
                        <span className="font-semibold text-primary-foreground">{CurrentUser?.data.followers.total} Followers</span>
                        <h3 className="mt-6 text-sm font-bold text-primary-foreground">Playing on Spotify</h3>
                        {CurrentTrack?.data ?
                            <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-primary">
                                <Avatar>
                                    <AvatarImage src={CurrentTrack?.data.item.album.images[0].url} />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <a target="_blank" href={CurrentTrack?.data.item.external_urls.spotify} className="text-base font-semibold hover:underline text-primary-foreground">{CurrentTrack?.data.item.name}</a>
                                    <a target="_blank" href={CurrentTrack?.data.item.artists[0].external_urls.spotify} className="text-base font-semibold hover:underline text-neutral-300">{CurrentTrack?.data.item.artists[0].name}</a>
                                </div>
                            </div>
                            : ""
                        }
                    </div>
                </div>
                <div className="flex">
                    <NavLink className={cx("px-4 py-2 rounded-t-lg text-primary font-bold", {
                        'bg-neutral-950 ease-out duration-300': location.pathname === "/profile"
                    })} to="/profile">Overview</NavLink>
                    <NavLink className={cx("px-4 py-2 rounded-t-lg text-primary font-bold", {
                        'bg-neutral-950 ease-out duration-300': location.pathname === "/profile/songs"
                    })} to="/profile/songs">Songs</NavLink>
                    <NavLink className={cx("px-4 py-2 rounded-t-lg text-primary font-bold", {
                        'bg-neutral-950 ease-out duration-300': location.pathname === "/profile/artists"
                    })} to="/profile/artists">Artists</NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;