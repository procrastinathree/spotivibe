import SearchAlbums from "@/components/search/SearchAlbums";
import SearchArtists from "@/components/search/SearchArtists";
import SearchSongs from "@/components/search/SearchSongs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpinnerLoader from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Search } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";
import NotFound404 from "./NotFound";
import { toast } from "@/components/ui/use-toast";
const SearchPage: FC = () => {
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "")

    const type = searchParams.get("type") || null
    const offset = (parseInt(searchParams.get("page") as string) - 1) * 24 || 0


    const { data, isPending, refetch, isError } = useQuery({
        queryKey: ["search"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=${type ?? "album%2Cartist%2Ctrack"}&limit=24&offset=${offset}`, { headers: { Authorization: `Bearer ${token}` } })
            return data.data
        }
    })

    if (isError) {
        toast({
            title: "Something went wrong",
            description: "Failed to fetch data",
            variant: "destructive"
        })

        return <NotFound404 />
    }

    useEffect(() => {
        refetch()
    }, [searchParams.get("page")])

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
                            navigate(0)
                        }
                    }}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    className="rounded-r-none dark text-neutral-300" />
                <Button type="button" className="rounded-l-none dark" onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
                    navigate(0)
                }}><Search className="text-primary-foreground" /></Button>
            </div>
            {isPending ?
                <SpinnerLoader />
                :
                !searchParams.get("type") ?
                    <>
                        <SearchArtists data={data.artists} />
                        <SearchSongs data={data.tracks} />
                        <SearchAlbums data={data.albums} />
                    </>
                    :
                    searchParams.get("type") === "artist" ?
                        <SearchArtists data={data.artists} />
                        :
                        searchParams.get("type") === "track" ?
                            <SearchSongs data={data.tracks} />
                            :
                            searchParams.get("type") === "album" ?
                                <SearchAlbums data={data.albums} />
                                :
                                <NotFound404 />
            }
        </div>
    );
}

export default SearchPage;