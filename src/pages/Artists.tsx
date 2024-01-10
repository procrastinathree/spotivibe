import { TopArtist } from "@/components/profile/TopArtists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import SpinnerLoader from "@/components/ui/spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cx } from "class-variance-authority";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";


interface ArtistsPageProps {

}

const ArtistsPage: FC<ArtistsPageProps> = () => {
    const token = Cookies.get("spotifyAuthToken")
    const [timeRange, setTimeRange] = useState<string>("long_term")
    const [sortBy, setSortBy] = useState<string>("spotify_rank")

    const { data, refetch, isPending } = useQuery({
        queryKey: ["TopArtists"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=100`, { headers: { Authorization: `Bearer ${token}` } })
            return data.data
        },
    })

    const [TopArtist, setTopArtist] = useState<TopArtist[]>([])

    useEffect(() => {
        const trimmedData: TopArtist[] = data?.items
            .map((item: any) => ({
                name: item.name,
                image: item.images[2].url,
                image_hd: item.images[1].url,
                popularity: item.popularity,
                url: item.external_urls.spotify,
            }))
        if (sortBy === "popularity_high") {
            setTopArtist(trimmedData.sort((a, b) => b.popularity - a.popularity) ?? [])
        } else if (sortBy === "popularity_low") {
            setTopArtist(trimmedData.sort((a, b) => a.popularity - b.popularity) ?? [])
        } else {
            setTopArtist(trimmedData ?? [])
        }
    }, [sortBy, data])

    const handleSortByChange = (value: string) => {
        setSortBy(value)
    }

    const handleTimeRangeChange = (value: string) => {
        setTimeRange(value)
        setTimeout(() => {
            refetch()
        }, 500);
    }
    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="font-bold">Top Artists</CardTitle>
                        <div className="flex gap-4">
                            <Select onValueChange={handleTimeRangeChange} defaultValue={timeRange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={timeRange.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="short_term">Short Term</SelectItem>
                                    <SelectItem value="medium_term">Medium Term</SelectItem>
                                    <SelectItem value="long_term">Long Term</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={handleSortByChange} defaultValue={sortBy}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder={sortBy.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="spotify_rank">Spotify Rank</SelectItem>
                                    <SelectItem value="popularity_high">Popularity (High)</SelectItem>
                                    <SelectItem value="popularity_low">Popularity (Low)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="flex gap-6">
                        {isPending ?
                            <div className="flex flex-row w-1/4 gap-2">
                                <Skeleton className="w-40 h-52 drop-shadow-lg" />
                                <Skeleton className="w-40 h-52 drop-shadow-lg" />
                                <Skeleton className="w-40 h-52 drop-shadow-lg" />
                            </div>
                            :
                            <div className="flex flex-row w-1/4 gap-2">
                                {TopArtist.slice(0, 3).map((item: TopArtist, index: number) => (
                                    <a href={item.url} target="_blank" className='relative w-40 h-52 duration-200 ease-out drop-shadow-lg hover:scale-[1.02]' key={item.name}>
                                        <img src={item.image_hd} className="object-cover w-full h-full rounded-lg" alt={item.name} />
                                        <span className={cx("absolute text-5xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2", {
                                            "text-[#FFD700]/50": index === 0,
                                            "text-[#C0C0C0]/50": index === 1,
                                            "text-[#CD7F32]/50": index === 2,
                                        })}>{index + 1}</span>
                                    </a>
                                ))}
                            </div>
                        }
                        <Card className="w-1/4 bg-background">
                            <CardHeader>
                                <CardTitle>By Popularity</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-24 text-base">Obscure</CardTitle>
                                    <Progress value={isPending ? 0 : TopArtist.filter((artist: TopArtist) => artist.popularity <= 50).length * 2} className="h-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-24 text-base">Average</CardTitle>
                                    <Progress value={isPending ? 0 : TopArtist.filter((artist: TopArtist) => artist.popularity < 80 && artist.popularity > 50).length * 2} className="h-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-24 text-base">Obscure</CardTitle>
                                    <Progress value={isPending ? 0 : TopArtist.filter((artist: TopArtist) => artist.popularity >= 80).length * 2} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                    </CardContent>
                    {isPending ?
                        <CardContent className="flex flex-col gap-4">
                            <Skeleton className="h-12" />
                            <Skeleton className="h-12" />
                            <Skeleton className="h-12" />
                        </CardContent>
                        :
                        <CardContent className="flex flex-col gap-4">
                            {TopArtist.map((item: TopArtist, index: number) => (
                                <div className={cx("relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-950/30", {
                                    'bg-gradient-to-r from-[#FFD700]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#FFD700]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 0,
                                    'bg-gradient-to-r from-[#C0C0C0]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#C0C0C0]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 1,
                                    'bg-gradient-to-r from-[#CD7F32]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#CD7F32]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 2,
                                })} key={index}>
                                    <span className="w-5 font-semibold text-end text-neutral-500">{index + 1}</span>
                                    <Avatar className="rounded-sm">
                                        <AvatarImage src={item.image} />
                                        <AvatarFallback>{item.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center justify-between w-full">
                                        <span className="font-bold text-neutral-100">{item.name}</span>
                                        <a href={item.url} target="_blank" className="absolute w-full h-full" key={item.name}></a>
                                        <div className="p-2">
                                            {sortBy.startsWith("popularity") ? <Progress className="w-32 h-2" value={item.popularity} /> : ""}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    }
                </Card>
            </div>
        </div>
    );
}

export default ArtistsPage;