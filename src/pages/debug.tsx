import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useCookies } from "react-cookie";

interface DebugPageProps {

}

const DebugPage: FC<DebugPageProps> = () => {
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken
    const { data } = useQuery({
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