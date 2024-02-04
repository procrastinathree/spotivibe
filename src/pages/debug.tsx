import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useCookies } from "react-cookie";

interface DebugPageProps {

}

const DebugPage: FC<DebugPageProps> = () => {
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken
    const { data, isPending, isError } = useQuery({
        queryKey: ["debug"],
        queryFn: async () => await axios.get('https://api.spotify.com/v1/search?a=a&type=artist&limit=50', { headers: { Authorization: `Bearer ${token}` } })
    })

    if (isPending) return <h1 className="text-primary">LOADING</h1>
    if (isError) return <h1 className="text-destructive">SOMETHING WENT WRONG</h1>

    return <div className="text-xl bg-slate-100">
        <pre>
            {JSON.stringify(data?.data, null, 2)}
        </pre>
    </div>;
}

export default DebugPage;