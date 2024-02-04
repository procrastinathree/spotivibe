import PlaylistSongs from "@/components/Details/PlaylistSongs";
import SpotifyIcon from "@/components/icons/SpotifyIcon";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { formatDuration, intervalToDuration } from "date-fns";
import { Clock } from "lucide-react";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const PlaylistDetailPage: FC = () => {
    const { id } = useParams()
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken

    const { data: Playlist, isPending: PlaylistPending } = useQuery({
        queryKey: [`playlistDetail${id}`],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })

    function millisecondsToCustomFormat(milliseconds: number): string {
        // Convert milliseconds to duration object
        const duration = intervalToDuration({ start: 0, end: milliseconds });

        // Format the duration as HHh mmmin
        const formattedDuration = formatDuration(duration, { format: ['hours', 'minutes'] });

        return formattedDuration;
    }
    console.log(Playlist)

    return (
        <div className="flex flex-col gap-16">
            {PlaylistPending ?
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
                <>
                    <Card className="relative flex flex-col overflow-hidden md:flex-row min-h-96 md:min-h-fit">
                        <div className="relative z-10 flex gap-4 m-4 md:absolute md:top-4 md:right-4">
                            <span className="flex items-center gap-2 px-2 py-2 text-sm rounded-sm xl:text-base bg-secondary text-secondary-foreground">
                                <Clock size={20} />
                                {millisecondsToCustomFormat(Playlist.tracks.items.reduce((acc: any, curr: any) => (acc + curr.track.duration_ms), 0))} duration for 100 Songs
                            </span>
                            <span className="flex items-center gap-2 px-2 py-2 text-sm rounded-sm xl:text-base bg-secondary text-secondary-foreground">
                                {Playlist.followers.total} Followers
                            </span>
                        </div>
                        <img
                            src={Playlist?.images[0].url}
                            alt="profile photo"
                            className="absolute inset-0 z-0 object-cover w-full h-full duration-100 rounded-md rounded-r-none pointer-events-none md:opacity-100 opacity-20 md:relative md:w-64 md:h-96 "
                        />
                        <CardHeader className="z-10 flex flex-col justify-between flex-grow bg-gradient-to-b via-transparent from-transparent to-neutral-950">
                            <div className="flex flex-col gap-2">
                                <CardTitle className="text-2xl font-bold duration-200 ease-out lg:text-3xl">{Playlist?.name}</CardTitle>
                                <CardDescription>{Playlist.description}</CardDescription>
                                <span className="px-2 py-1 text-sm font-semibold rounded-full bg-primary w-fit text-primary-foreground">{Playlist.tracks.total} Songs</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <CardDescription className="text-lg">By {Playlist.owner.display_name}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <a target="_blank" href={Playlist?.external_urls.spotify} className={buttonVariants({ className: "flex gap-2 relative !z-20 rounded-t-none md:rounded-lg !font-bold md:absolute md:bottom-4 md:right-4" })}>
                            <SpotifyIcon size={16} />
                            <span>
                                Open in spotify
                            </span>
                        </a>
                    </Card>
                    <PlaylistSongs data={Playlist.tracks} link={Playlist.external_urls.spotify} />
                </>
            }
        </div>
    );
}

export default PlaylistDetailPage;