import SearchAlbums from "@/components/search/SearchAlbums";
import SearchArtists from "@/components/search/SearchArtists";
import SearchSongs from "@/components/search/SearchSongs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpinnerLoader from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { Search } from "lucide-react";
import { FC, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const SearchPage: FC = () => {
    const token = Cookies.get("spotifyAuthToken")

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "")

    const { data, isPending, isError, refetch } = useQuery({
        queryKey: ["search"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=album%2Cartist%2Ctrack&limit=15`, { headers: { Authorization: `Bearer ${token}` } })
            return data.data
        }
    })


    return (
        <div className="flex flex-col gap-16">
            <div className="flex w-2/3">
                <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault()
                            navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
                            refetch()
                        }
                    }}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    className="rounded-r-none dark text-neutral-300" />
                <Button type="button" className="rounded-l-none dark" onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
                    refetch()
                }}><Search className="text-primary-foreground"/></Button>
            </div>
            {isPending ?
                <SpinnerLoader />
                :
                <>
                    <SearchArtists searchQuery={searchQuery} data={data.artists} />
                    <SearchSongs searchQuery={searchQuery} data={data.tracks} />
                    <SearchAlbums searchQuery={searchQuery} data={data.albums}/>
                </>
            }
        </div>
    );
}

export default SearchPage;