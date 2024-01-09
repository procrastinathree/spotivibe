import { TopSongs } from "@/components/profile/TopSongs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { FC, useState } from "react";

interface DebugPageProps {

}

const DebugPage: FC<DebugPageProps> = () => {
    const [timeRange, setTimeRange] = useState<string>("long_term")
    const token = Cookies.get("spotifyAuthToken")
    const { data, refetch } = useQuery({
        queryKey: ["TopSongs"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        },
    })

    let TopSongs: TopSongs[] = data?.data.items
        .map((item: any) => ({
            name: item.name,
            image: item.album.images[2].url,
            duration: item.duration_ms,
            release_date: item.album.release_date,
            popularity: item.popularity,
            url: item.external_urls.spotify,
            artists: item.artists.map((item: any) => ({
                name: item.name,
                url: item.external_urls.spotify
            }))
        })) ?? []

    return <div className="text-xl bg-slate-100">
        <pre>
            {JSON.stringify(data?.data, null, 2)}
        </pre>
    </div>;
}

export default DebugPage;