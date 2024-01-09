import { TopSongs } from "@/components/profile/TopSongs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cx } from "class-variance-authority";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";


interface SongsPageProps {

}

const SongsPage: FC<SongsPageProps> = () => {
    const token = Cookies.get("spotifyAuthToken")
    const [timeRange, setTimeRange] = useState<string>("long_term")
    const [sortBy, setSortBy] = useState<string>("spotify_rank")
    const { data, refetch } = useQuery({
        queryKey: ["TopSongs"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=100`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        },
    })
    const [TopSongs, setTopSongs] = useState<TopSongs[]>([])

    useEffect(() => {
        setTopSongs(data?.data.items
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
            })) ?? [])
    }, [data])

    const handleSortByChange = (value: string) => {
        setSortBy(value)
        const sortData = (currentTopSongs: TopSongs[]) => {
            switch (value) {
                case "popularity_low":
                    return [...currentTopSongs].sort((a, b) => a.popularity - b.popularity);
                case "popularity_high":
                    return [...currentTopSongs].sort((a, b) => b.popularity - a.popularity);
                case "release_new":
                    return [...currentTopSongs].sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
                case "release_old":
                    return [...currentTopSongs].sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
                // Add more cases for other sorting options
                default:
                    // Do nothing or apply a default sorting logic
                    return currentTopSongs;
            }
        };

        setTopSongs((currentTopSongs) => sortData(currentTopSongs));
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
                <Card className="w-2/3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="font-bold">Top Songs</CardTitle>
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
                                    <SelectItem value="release_new">Release Date (New)</SelectItem>
                                    <SelectItem value="release_old">Release Date (Old)</SelectItem>
                                    <SelectItem value="length_long">Length (Long)</SelectItem>
                                    <SelectItem value="length_short">Length (Short)</SelectItem>
                                    <SelectItem value="popularity_high">Popularity (High)</SelectItem>
                                    <SelectItem value="popularity_low">Popularity (Low)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-row gap-2">
                        {TopSongs.slice(0, 3).map((item: TopSongs, index: number) => (
                            <a href={item.url} target="_blank" className={cx('w-40 drop-shadow-lg', {
                                'z-20 hover:scale-[1.02] ease-out duration-300': index === 0,
                                '-translate-x-24 scale-90 z-10 hover:-translate-x-20 ease-out duration-300': index === 1,
                                '-translate-x-52 scale-75 hover:-translate-x-44 ease-out duration-300': index === 2,
                            })} key={item.name}>
                                <img src={item.image} className="w-full rounded-full" alt={item.name} />
                            </a>
                        ))}
                    </CardContent>
                    <CardContent className="flex flex-col gap-4">
                        {TopSongs.map((item: TopSongs, index: number) => (
                            <div className={cx("relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-950/30", {
                                'bg-gradient-to-r from-[#FFD700]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#FFD700]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 0,
                                'bg-gradient-to-r from-[#C0C0C0]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#C0C0C0]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 1,
                                'bg-gradient-to-r from-[#CD7F32]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#CD7F32]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 2,
                            })} key={index}>
                                <span className="w-5 font-semibold text-end text-neutral-500">{index + 1}</span>
                                <Avatar>
                                    <AvatarImage src={item.image} />
                                    <AvatarFallback>{item.name.at(0)?.toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-neutral-100">{item.name}</span>
                                    <div className="flex gap-2">{
                                        item.artists.map((artist: any, index: number, array) => (
                                            <div className="flex gap-2" key={index}>
                                                <a href={artist.url} target="_blank" className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</a>
                                                {index !== array.length - 1 ?
                                                    <Separator orientation="vertical" className="dark" /> :
                                                    ""
                                                }
                                            </div>
                                        ))
                                    }</div>
                                </div>
                                <a href={item.url} target="_blank" className="absolute w-full h-full" key={item.name}></a>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default SongsPage;