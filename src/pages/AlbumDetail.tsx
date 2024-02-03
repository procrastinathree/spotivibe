import AlbumSongs from "@/components/Details/AlbumSongs";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { millisecondsToDuration } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getYear } from "date-fns";
import { Clock } from "lucide-react";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";

const AlbumDetailPage: FC = () => {
    let { id } = useParams()
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken
    const userCountry = localStorage.getItem("userCountry")

    const { data: Album, isPending: AlbumPending } = useQuery({
        queryKey: [`albumDetail${id}`],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}?market=${userCountry}`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })

    return (
        <div className="flex flex-col gap-16">
            {AlbumPending ?
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
                    <span className="absolute flex items-center gap-2 px-2 py-2 rounded-sm bg-secondary text-secondary-foreground top-4 right-4">
                        <Clock size={20} />
                        {millisecondsToDuration(Album.tracks.items.reduce((acc: any, curr: any) => (acc + curr.duration_ms), 0))}
                    </span>
                    <a target="_blank" href={Album?.external_urls.spotify} className={buttonVariants({ className: "flex gap-2 !font-bold absolute bottom-4 right-4" })}>
                        <SpotifyIcon size={16} />
                        <span>
                            Open in spotify
                        </span>
                    </a>
                    <img
                        src={Album?.images[1].url}
                        alt="profile photo"
                        className="object-cover w-40 h-40 rounded-md rounded-r-none lg:w-64 lg:h-80 border-neutral-100 bg-neutral-950 text-neutral-500"
                    />
                    <CardHeader className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-3xl font-bold">{Album?.name}</CardTitle>
                            <div className="flex gap-4">
                                {Album.artists.map((item: any) => (
                                    <Link to={`/artist/${item.id}`} className={buttonVariants({ size: "sm" })} key={item.id}>{item.name}</Link>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                {Album.genres.map((item: any) => (
                                    <span className="px-2 py-1 text-sm font-bold rounded-sm bg-primary text-primary-foreground" key={item}>{item}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <CardTitle className="text-lg">{getYear(new Date(Album.release_date))}</CardTitle>
                                <CardDescription className="text-lg">Released</CardDescription>
                                <CardTitle className="txt-lg">{Album.type}</CardTitle>
                                <CardDescription className="text-lg">Type</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            }
            <div className="flex flex-col gap-4">
                <CardTitle>Songs</CardTitle>
                <CardDescription>The tracklist for {AlbumPending ? "" : Album.name}</CardDescription>
                {AlbumPending ? "loading"
                    :
                    <AlbumSongs data={Album.tracks} image={Album.images[2].url} />
                }
            </div>
        </div>
    );
}

export default AlbumDetailPage;