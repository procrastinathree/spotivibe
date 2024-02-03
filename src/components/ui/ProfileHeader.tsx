import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cx } from "class-variance-authority";
import { FC } from "react";
import { useCookies } from 'react-cookie';
import { Link, NavLink, useLocation } from "react-router-dom";
import SpotifyIcon from "../icons/SpotifyIcon";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { buttonVariants } from "./button";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { ToastAction } from "./toast";
import { useToast } from "./use-toast";

interface ProfileHeaderProps {

}

const ProfileHeader: FC<ProfileHeaderProps> = () => {
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken
    const location = useLocation()
    const { toast } = useToast()
    const { data: CurrentUser, error: CurrentUserError, isPending: currentUserPending } = useQuery({
        queryKey: ['CurrentUser'],
        queryFn: async () => await axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${token}` } })
    })

    localStorage.setItem("userCountry", CurrentUser?.data.country)

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
        <div className="flex flex-col mt-8 ">
            <div className="flex flex-col gap-8">
                {currentUserPending ?
                    <div className="flex flex-col items-center h-auto gap-8 md:flex-row md:items-start lg:h-52">
                        <Skeleton className="w-40 h-40 rounded-full dark lg:w-52 lg:h-52" />
                        <div className="flex flex-col items-center flex-grow gap-2 dark md:items-start">
                            <Skeleton className="h-12 w-60" />
                            <Skeleton className="h-5 w-36" />
                            <Skeleton className="w-24 h-5" />
                        </div>
                    </div>
                    :
                    <div className="flex flex-col items-center h-auto gap-8 md:flex-row md:items-start">
                        <img
                            src={CurrentUser?.data.images[1].url}
                            alt="profile photo"
                            className="object-cover w-40 h-40 rounded-md lg:w-52 lg:h-64 border-neutral-100 bg-neutral-950 text-neutral-500"
                        />
                        <div className="flex flex-col items-center flex-grow gap-2 md:items-start">
                            <h1 className="text-4xl font-bold text-secondary-foreground">{CurrentUser?.data.display_name ?? ""}</h1>
                            <span className="font-semibold text-secondary-foreground">{CurrentUser?.data.followers.total} Followers</span>
                            <a target="_blank" href={CurrentUser?.data.external_urls.spotify} className={buttonVariants({ className: "flex gap-2" })}>
                                <SpotifyIcon size={16} />
                                <span>
                                    Open in spotify
                                </span>
                            </a>
                            {CurrentTrack?.data ?
                                <div className="flex items-center gap-4 px-4 py-2 rounded-lg bg-primary">
                                    <Avatar>
                                        <AvatarImage src={CurrentTrack?.data.item.album.images[0].url} />
                                        <AvatarFallback></AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <Link to={`/track/${CurrentTrack?.data.item.id}`} className="text-base font-semibold hover:underline text-secondary-foreground">{CurrentTrack?.data.item.name}</Link>
                                        <div className="flex gap-2">{
                                            CurrentTrack?.data.item.artists.map((artist: any, index: number, array: any) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <Link to={`/artist/${artist.id}`} className="z-10 font-bold rounded-lg text-neutral-950 hover:underline" key={artist.name}>{artist.name}</Link>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                </div>
                                : ""
                            }
                        </div>
                    </div>
                }
                <div className="flex flex-row md:mb-0">
                    <NavLink className={cx("px-4 py-2 rounded-t-lg text-center text-primary font-bold", {
                        'bg-neutral-950 ease-out duration-300': location.pathname === "/profile"
                    })} to="/profile">Overview</NavLink>
                    <NavLink className={cx("px-4 py-2 rounded-t-lg text-center text-primary font-bold", {
                        'bg-neutral-950 ease-out duration-300': location.pathname === "/profile/songs"
                    })} to="/profile/songs">Songs</NavLink>
                    <NavLink className={cx("px-4 py-2 rounded-t-lg text-center text-primary font-bold", {
                        'bg-neutral-950 ease-out duration-300': location.pathname === "/profile/artists"
                    })} to="/profile/artists">Artists</NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;