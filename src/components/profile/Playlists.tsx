import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useCookies } from "react-cookie";
import { Skeleton } from "../ui/skeleton";
import { CardDescription, CardTitle } from "../ui/card";
import { Link } from "react-router-dom";
const Playlists: FC = () => {
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken

    const { data, isPending } = useQuery({
        queryKey: ['mePlaylists'],
        queryFn: async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me/playlists", { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })

    const Playlists = !isPending && data.items.filter((item: any) => item.public) || []
    console.log(Playlists)
    if (isPending) return (
        <Skeleton className="w-40 h-40" />
    )
    return (
        <div className="flex flex-col gap-8">
            <CardTitle className="font-bold">Playlists</CardTitle>
            <div className="flex flex-wrap gap-4">
                {Playlists.map((item: any) => (
                    <Link to={`/playlist/${item.id}`} className="flex flex-col items-center gap-4 p-4 duration-200 ease-out rounded-lg hover:bg-secondary">
                        <img src={item.images[1].url} className="w-40 h-40 rounded-lg" alt="" />
                        <div className="flex gap-4">
                            <CardTitle className="text-base">{item.name}</CardTitle>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">{item.tracks.total} Songs</span>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Playlists;