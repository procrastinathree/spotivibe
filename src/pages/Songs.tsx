import { TopSongs } from "@/components/profile/TopSongs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
            const data = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, { headers: { Authorization: `Bearer ${token}` } })
            return data.data
        },
    })
    const [TopSongs, setTopSongs] = useState<TopSongs[]>([])

    useEffect(() => {
        const trimmedData: TopSongs[] = data?.items
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
            }))
        if (sortBy === "popularity_high") {
            setTopSongs(trimmedData.sort((a, b) => b.popularity - a.popularity) ?? [])
        } else if (sortBy === "popularity_low") {
            setTopSongs(trimmedData.sort((a, b) => a.popularity - b.popularity) ?? [])
        } else if (sortBy === "length_long") {
            setTopSongs(trimmedData.sort((a, b) => b.duration - a.duration) ?? [])
        } else if (sortBy === "length_short") {
            setTopSongs(trimmedData.sort((a, b) => a.duration - b.duration) ?? [])
        } else if (sortBy === "release_old") {
            setTopSongs(trimmedData.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()) ?? [])
        } else if (sortBy === "release_new") {
            setTopSongs(trimmedData.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()) ?? [])
        } else {
            setTopSongs(trimmedData ?? [])
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
    const formatDuration = (milliseconds: number): string => new Date(milliseconds).toISOString().substr(14, 5);
    const countByDecade = (decade: number, data: TopSongs[]) => {
        const startYear = decade;
        const endYear = startYear + 9;

        return data.filter((item: TopSongs) => {
            const releaseYear = new Date(item.release_date).getFullYear();
            return releaseYear >= startYear && releaseYear <= endYear;
        }).length;
    };
    const countItemsByDuration = (dataArray: TopSongs[], thresholdInMinutes: number) => {
        const thresholdInMilliseconds = thresholdInMinutes * 60 * 1000;

        const countLessThanOrEqualThreshold = dataArray.filter(item => item.duration <= thresholdInMilliseconds).length;
        const countGreaterThanOrEqualThreshold = dataArray.filter(item => item.duration >= thresholdInMilliseconds).length;

        return {
            lessThanOrEqualThreshold: countLessThanOrEqualThreshold,
            greaterThanOrEqualThreshold: countGreaterThanOrEqualThreshold
        };
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-8">
                <Card className="flex flex-col w-full gap-6">
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
                    <CardContent className="flex gap-4">
                        <div className="flex flex-row w-1/4 gap-2">
                            {TopSongs.slice(0, 3).map((item: TopSongs, index: number) => (
                                <a href={item.url} target="_blank" className='relative w-40 duration-200 ease-out drop-shadow-lg hover:scale-[1.02]' key={item.name}>
                                    <img src={item.image} className="object-cover w-full h-full rounded-lg" alt={item.name} />
                                    <span className={cx("absolute text-5xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2", {
                                        "text-[#FFD700]/50": index === 0,
                                        "text-[#C0C0C0]/50": index === 1,
                                        "text-[#CD7F32]/50": index === 2,
                                    })}>{index + 1}</span>
                                </a>
                            ))}
                        </div>
                        <Card className="w-1/4 bg-background">
                            <CardHeader>
                                <CardTitle>By Popularity</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-24 text-base">Obscure</CardTitle>
                                    <Progress value={TopSongs.filter((songs: TopSongs) => songs.popularity <= 50).length * 2} className="h-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-24 text-base">Average</CardTitle>
                                    <Progress value={TopSongs.filter((songs: TopSongs) => songs.popularity < 80 && songs.popularity > 50).length * 2} className="h-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-24 text-base">Obscure</CardTitle>
                                    <Progress value={TopSongs.filter((songs: TopSongs) => songs.popularity >= 80).length * 2} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-1/4 bg-background">
                            <CardHeader>
                                <CardTitle>By Decade</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-20 text-base">2020s</CardTitle>
                                    <Progress value={countByDecade(2020, TopSongs) * 2} className="h-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-20 text-base">2010s</CardTitle>
                                    <Progress value={countByDecade(2010, TopSongs) * 2} className="h-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-20 text-base">2000s</CardTitle>
                                    <Progress value={countByDecade(2000, TopSongs) * 2} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="w-1/4 bg-background">
                            <CardHeader>
                                <CardTitle>By Length</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-16 text-base text-end">-4min</CardTitle>
                                    <Progress value={countItemsByDuration(TopSongs, 4).lessThanOrEqualThreshold * 2} className="h-2" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <CardTitle className="w-16 text-base text-end">4m+</CardTitle>
                                    <Progress value={countItemsByDuration(TopSongs, 4).greaterThanOrEqualThreshold * 2} className="h-2" />
                                </div>
                            </CardContent>
                        </Card>
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
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{item.name} {item.popularity}</span>
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
                                    <div className="p-2">
                                        {sortBy.startsWith("length") ? <span className="font-bold text-neutral-100">{formatDuration(item.duration)}</span> :
                                            sortBy.startsWith("popularity") ? <Progress className="w-32 h-2" value={item.popularity} /> :
                                                sortBy.startsWith("release") ? <span className="font-bold text-neutral-100">{item.release_date}</span> : ""
                                        }

                                    </div>
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