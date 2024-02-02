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
    const { data, isPending } = useQuery({
        queryKey: ["debug"],
        queryFn: async () => await axios.get('https://api.spotify.com/v1/search?q=avenged+sevenfold&type=album%2Cplaylist%2Cartist%2Ctrack&limit=10', { headers: { Authorization: `Bearer ${token}` } })
    })

    return <div className="text-xl bg-slate-100">
        <pre>
            {JSON.stringify(data?.data, null, 2)}
        </pre>
    </div>;
}

export default DebugPage;