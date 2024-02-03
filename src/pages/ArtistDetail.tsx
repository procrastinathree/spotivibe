import ArtistAlbumList from "@/components/Details/ArtistAlbumList";
import ArtistTopSongs from "@/components/Details/ArtistTopSongs";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";
const ArtistDetailPage: FC = () => {
    let { id } = useParams()
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken
    const userCountry = localStorage.getItem("userCountry")

    const { data: Artist, isPending: ArtistPending } = useQuery({
        queryKey: [`artistDetail${id}`],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })

    const { data: TopSongs, isPending: TopSongsPending } = useQuery({
        queryKey: [`artistTopSongs${id}`],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=${userCountry}`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })

    const { data: ArtistAlbum, isPending: ArtistAlbumPending } = useQuery({
        queryKey: [`artistAlbum${id}`],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums?market=${userCountry}&limit=18`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })

    return (
        <div className="flex flex-col gap-16">
            {ArtistPending ?
                <Card className="flex flex-row">
                    <Skeleton className="w-40 h-40 rounded-md rounded-r-none lg:w-64 lg:h-80" />
                    <CardHeader className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-10 w-72" />
                            <Skeleton className="h-6 w-52" />
                            <div className="flex gap-4">
                                <Skeleton className="w-40 h-6" />
                                <Skeleton className="w-24 h-6" />
                                <Skeleton className="w-32 h-6" />
                                <Skeleton className="w-16 h-6" />
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                :
                <Card className="relative flex flex-row">
                    <a target="_blank" href={Artist?.external_urls.spotify} className={buttonVariants({ className: "flex gap-2 !font-bold absolute bottom-4 right-4" })}>
                        <SpotifyIcon size={16} />
                        <span>
                            Open in spotify
                        </span>
                    </a>
                    <img
                        src={Artist?.images[1].url}
                        alt="profile photo"
                        className="object-cover w-40 h-40 rounded-md rounded-r-none lg:w-64 lg:h-80 border-neutral-100 bg-neutral-950 text-neutral-500"
                    />
                    <CardHeader className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-3xl font-bold">{Artist?.name}</CardTitle>
                            <CardTitle className="text-base">{formatNumber(Artist.followers.total)} Followers</CardTitle>
                            <div className="flex gap-4">
                                {Artist.genres.map((item: any) => (
                                    <span className="px-2 py-1 text-sm font-bold rounded-sm bg-primary text-primary-foreground" key={item}>{item}</span>
                                ))}
                            </div>
                        </div>
                        {TopSongsPending ?
                            <Skeleton className="flex items-center h-20 gap-4 w-72" />
                            :
                            <div className="flex flex-col gap-4 w-fit">
                                <CardTitle>Top Song</CardTitle>
                                <div className="relative flex items-center gap-4 p-2 pr-4 duration-200 ease-out rounded-sm bg-background hover:bg-background/50">
                                    <Avatar>
                                        <AvatarImage src={TopSongs.tracks[0].album.images[2].url} />
                                        <AvatarFallback>{TopSongs.tracks[0].name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{TopSongs.tracks[0].name}</span>
                                        <div className="flex gap-2">{
                                            TopSongs.tracks[0].artists.map((artist: any, index: number, array: []) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <Link to={`/artist/${artist.id}`} className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</Link>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                    <Link to={`/track/${TopSongs.tracks[0].id}`} className="absolute w-full h-full" key={TopSongs.tracks[0].name}></Link>
                                </div>
                            </div>
                        }
                    </CardHeader>
                </Card>
            }
            <div className="flex flex-col gap-4">
                <CardTitle>Most Popular Songs</CardTitle>
                <CardDescription>The most popular songs by {ArtistPending ? "" : Artist.name}.</CardDescription>
                {TopSongsPending ? "loading"
                    :
                    <ArtistTopSongs data={TopSongs} />
                }
            </div>
            <div className="flex flex-col gap-4">
                <CardTitle>Albums</CardTitle>
                <CardDescription>{ArtistPending ? "" : Artist.name}'s most popular albums.</CardDescription>
                {ArtistAlbumPending ? "loading"
                    :
                    <ArtistAlbumList data={ArtistAlbum} />
                }
            </div>
        </div>
    );
}

export default ArtistDetailPage;