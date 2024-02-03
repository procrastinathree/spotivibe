import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getYear } from "date-fns";
import { Clock } from "lucide-react";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { Link, useParams } from "react-router-dom";

const TrackDetailPage: FC = () => {
    let { id } = useParams()
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken

    const { data: Track, isPending: TrackPending } = useQuery({
        queryKey: [`trackDetail${id}`],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })
    const formatDuration = (milliseconds: number): string => new Date(milliseconds).toISOString().substr(14, 5);

    console.log(Track)

    return (
        <div className="flex flex-col gap-16">
            {TrackPending ?
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
                        {formatDuration(Track.duration_ms)}
                    </span>
                    <a target="_blank" href={Track?.external_urls.spotify} className={buttonVariants({ className: "flex gap-2 !font-bold absolute bottom-4 right-4" })}>
                        <SpotifyIcon size={16} />
                        <span>
                            Open in spotify
                        </span>
                    </a>
                    <img
                        src={Track?.album.images[1].url}
                        alt="profile photo"
                        className="object-cover w-40 h-40 rounded-md rounded-r-none lg:w-64 lg:h-80 border-neutral-100 bg-neutral-950 text-neutral-500"
                    />
                    <CardHeader className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                            <CardTitle className="text-3xl font-bold">{Track?.name}</CardTitle>
                            <div className="flex gap-4">
                                {Track.artists.map((item: any) => (
                                    <Link to={`/artist/${item.id}`} className={buttonVariants({ size: "sm" })} key={item.id}>{item.name}</Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <CardTitle className="text-lg">{getYear(new Date(Track.album.release_date))}</CardTitle>
                                <CardDescription className="text-lg">Released on album:</CardDescription>
                            </div>
                            <Link to={`/album/${Track.album.id}`} className="flex gap-4 p-2 pr-4 duration-200 ease-out rounded-sm w-fit bg-background hover:bg-background/50">
                                <img src={Track.album.images[2].url} className="w-24 h-24 rounded-sm opacity-60" alt={Track.album.name} />
                                <div className="flex flex-col gap-2">
                                    <CardTitle className="text-base">{Track.album.name}</CardTitle>
                                    {Track.album.artists.map((item: any) => (
                                        <Link to={`/artist/${item.id}`} className={buttonVariants({ className: " !px-2 !py-1 h-6 w-fit !text-xs" })} key={item.id}>{item.name}</Link>
                                    ))}
                                </div>
                            </Link>
                        </div>
                    </CardHeader>
                </Card>
            }
        </div>
    );
}

export default TrackDetailPage;