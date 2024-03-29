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
            const data = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=100&offset=50`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        },
    })
    console.log(data?.data.items.length)

    return <div className="text-xl bg-slate-100">
        <pre>
            {JSON.stringify(data?.data, null, 2)}
        </pre>
    </div>;
}

export default DebugPage;