import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TopSongs } from "./TopSongs";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { formatDistanceToNow } from 'date-fns'
import { Skeleton } from "../ui/skeleton";


const Taste: FC = () => {
    const token = Cookies.get("spotifyAuthToken")
    const [timeRange, setTimeRange] = useState<string>("long_term")

    const { data, refetch, isPending } = useQuery({
        queryKey: ["TopSongsTaste"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })


    let TopSongs: TopSongs[] = isPending ? [] : data?.data.items
        .map((item: any) => ({
            name: item.name,
            image: item.album.images[2].url,
            image_hd: item.album.images[1].url,
            duration: item.duration_ms,
            release_date: item.album.release_date,
            popularity: item.popularity,
            url: item.external_urls.spotify,
            artists: item.artists.map((item: any) => ({
                name: item.name,
                url: item.external_urls.spotify
            }))
        })) ?? []

    const handleTimeRangeChange = (value: string) => {
        setTimeRange(value)
        setTimeout(() => {
            refetch()
        }, 500);
    }

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

    const formatDuration = (milliseconds: number): string => new Date(milliseconds).toISOString().substr(14, 5);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-bold">Taste</CardTitle>
                <Select onValueChange={handleTimeRangeChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={timeRange.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="short_term">Short Term</SelectItem>
                        <SelectItem value="medium_term">Medium Term</SelectItem>
                        <SelectItem value="long_term">Long Term</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-row gap-6">
                <div className="flex flex-col w-1/3 gap-3">
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle>By Decade</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-20 text-base">2020s</CardTitle>
                                <Progress value={isPending ? 0 : countByDecade(2020, TopSongs) * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-20 text-base">2010s</CardTitle>
                                <Progress value={isPending ? 0 : countByDecade(2010, TopSongs) * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-20 text-base">2000s</CardTitle>
                                <Progress value={isPending ? 0 : countByDecade(2000, TopSongs) * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-20 text-base">1990s</CardTitle>
                                <Progress value={isPending ? 0 : countByDecade(1990, TopSongs) * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-20 text-base">1980s</CardTitle>
                                <Progress value={isPending ? 0 : countByDecade(1980, TopSongs) * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-20 text-base">1970s</CardTitle>
                                <Progress value={isPending ? 0 : countByDecade(1970, TopSongs) * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-20 text-base">1960s</CardTitle>
                                <Progress value={isPending ? 0 : countByDecade(1960, TopSongs) * 2} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader className="flex flex-col">
                            <CardTitle className="flex items-center gap-3 text-xl">Newest
                                <span className="px-2 text-sm rounded-lg bg-neutral-800">{isPending ? "" : formatDistanceToNow(new Date(TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) > new Date(acc.release_date)) ? curr : acc)?.release_date), { addSuffix: true })}</span>
                            </CardTitle>
                            {isPending ?
                                <Skeleton className="h-16" />
                                :
                                <div className="relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-900">
                                    <Avatar>
                                        <AvatarImage src={TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) > new Date(acc.release_date)) ? curr : acc)?.image} />
                                        <AvatarFallback>{TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) > new Date(acc.release_date)) ? curr : acc)?.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) > new Date(acc.release_date)) ? curr : acc)?.name}</span>
                                        <div className="flex gap-2">{
                                            TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) > new Date(acc.release_date)) ? curr : acc)?.artists.map((artist: any, index: number, array) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <a href={artist.url} target="_blank" className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</a>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                    <a href={TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) > new Date(acc.release_date)) ? curr : acc)?.url} target="_blank" className="absolute w-full h-full" key={TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) > new Date(acc.release_date)) ? curr : acc)?.name}></a>
                                </div>
                            }
                        </CardHeader>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader className="flex flex-col">
                            <CardTitle className="flex items-center gap-3 text-xl">Oldest
                                <span className="px-2 text-sm rounded-lg bg-neutral-800">{isPending ? "" : formatDistanceToNow(new Date(TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) < new Date(acc.release_date)) ? curr : acc)?.release_date), { addSuffix: true })}</span>
                            </CardTitle>
                            {isPending ?
                                <Skeleton className="h-16" />
                                :
                                <div className="relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-900">
                                    <Avatar>
                                        <AvatarImage src={TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) < new Date(acc.release_date)) ? curr : acc)?.image} />
                                        <AvatarFallback>{TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) < new Date(acc.release_date)) ? curr : acc)?.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) < new Date(acc.release_date)) ? curr : acc)?.name}</span>
                                        <div className="flex gap-2">{
                                            TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) < new Date(acc.release_date)) ? curr : acc)?.artists.map((artist: any, index: number, array) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <a href={artist.url} target="_blank" className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</a>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                    <a href={TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) < new Date(acc.release_date)) ? curr : acc)?.url} target="_blank" className="absolute w-full h-full" key={TopSongs?.reduce((acc, curr) => (new Date(curr.release_date) < new Date(acc.release_date)) ? curr : acc)?.name}></a>
                                </div>
                            }
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex flex-col w-1/3 gap-3">
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle>By Popularity</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-24 text-base">Obscure</CardTitle>
                                <Progress value={isPending ? 0 : TopSongs.filter((songs: TopSongs) => songs.popularity <= 50).length * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-24 text-base">Average</CardTitle>
                                <Progress value={isPending ? 0 : TopSongs.filter((songs: TopSongs) => songs.popularity < 80 && songs.popularity > 50).length * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-24 text-base">Obscure</CardTitle>
                                <Progress value={isPending ? 0 : TopSongs.filter((songs: TopSongs) => songs.popularity >= 80).length * 2} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader className="flex flex-col">
                            <CardTitle className="text-xl">Most Popular</CardTitle>
                            {isPending ?
                                <Skeleton className="h-16" />
                                :
                                <div className="relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-900">
                                    <Avatar>
                                        <AvatarImage src={TopSongs?.reduce((acc, curr) => (curr.popularity > acc.popularity) ? curr : acc)?.image} />
                                        <AvatarFallback>{TopSongs?.reduce((acc, curr) => (curr.popularity > acc.popularity) ? curr : acc)?.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{TopSongs?.reduce((acc, curr) => (curr.popularity > acc.popularity) ? curr : acc)?.name}</span>
                                        <div className="flex gap-2">{
                                            TopSongs?.reduce((acc, curr) => (curr.popularity > acc.popularity) ? curr : acc)?.artists.map((artist: any, index: number, array) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <a href={artist.url} target="_blank" className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</a>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                    <a href={TopSongs?.reduce((acc, curr) => (curr.popularity > acc.popularity) ? curr : acc)?.url} target="_blank" className="absolute w-full h-full" key={TopSongs?.reduce((acc, curr) => (curr.popularity > acc.popularity) ? curr : acc)?.name}></a>
                                </div>
                            }
                        </CardHeader>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader className="flex flex-col">
                            <CardTitle className="text-xl">Most Obscure</CardTitle>
                            {isPending ?
                                <Skeleton className="h-16" />
                                :
                                <div className="relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-900">
                                    <Avatar>
                                        <AvatarImage src={TopSongs?.reduce((acc, curr) => (curr.popularity < acc.popularity) ? curr : acc)?.image} />
                                        <AvatarFallback>{TopSongs?.reduce((acc, curr) => (curr.popularity < acc.popularity) ? curr : acc)?.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{TopSongs?.reduce((acc, curr) => (curr.popularity < acc.popularity) ? curr : acc)?.name}</span>
                                        <div className="flex gap-2">{
                                            TopSongs?.reduce((acc, curr) => (curr.popularity < acc.popularity) ? curr : acc)?.artists.map((artist: any, index: number, array) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <a href={artist.url} target="_blank" className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</a>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                    <a href={TopSongs?.reduce((acc, curr) => (curr.popularity < acc.popularity) ? curr : acc)?.url} target="_blank" className="absolute w-full h-full" key={TopSongs?.reduce((acc, curr) => (curr.popularity < acc.popularity) ? curr : acc)?.name}></a>
                                </div>
                            }
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex flex-col w-1/3 gap-3">
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle>By Length</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-16 text-base text-end">-4min</CardTitle>
                                <Progress value={isPending ? 0 : countItemsByDuration(TopSongs, 4).lessThanOrEqualThreshold * 2} className="h-2" />
                            </div>
                            <div className="flex items-center gap-4">
                                <CardTitle className="w-16 text-base text-end">4m+</CardTitle>
                                <Progress value={isPending ? 0 : countItemsByDuration(TopSongs, 4).greaterThanOrEqualThreshold * 2} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader className="flex flex-col">
                            <CardTitle className="flex items-center gap-3 text-xl">Longest
                                <span className="px-2 text-sm rounded-lg bg-neutral-800">{isPending ? "" : formatDuration(TopSongs?.reduce((acc, curr) => (curr.duration > acc.duration) ? curr : acc)?.duration)}</span>
                            </CardTitle>
                            {isPending ?
                                <Skeleton className="h-16" />
                                :
                                <div className="relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-900">
                                    <Avatar>
                                        <AvatarImage src={TopSongs?.reduce((acc, curr) => (curr.duration > acc.duration) ? curr : acc)?.image} />
                                        <AvatarFallback>{TopSongs?.reduce((acc, curr) => (curr.duration > acc.duration) ? curr : acc)?.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{TopSongs?.reduce((acc, curr) => (curr.duration > acc.duration) ? curr : acc)?.name}</span>
                                        <div className="flex gap-2">{
                                            TopSongs?.reduce((acc, curr) => (curr.duration > acc.duration) ? curr : acc)?.artists.map((artist: any, index: number, array) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <a href={artist.url} target="_blank" className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</a>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                    <a href={TopSongs?.reduce((acc, curr) => (curr.duration > acc.duration) ? curr : acc)?.url} target="_blank" className="absolute w-full h-full" key={TopSongs?.reduce((acc, curr) => (curr.duration > acc.duration) ? curr : acc)?.name}></a>
                                </div>
                            }
                        </CardHeader>
                    </Card>
                    <Card className="bg-background">
                        <CardHeader className="flex flex-col">
                            <CardTitle className="flex items-center gap-3 text-xl">Shortest
                                <span className="px-2 text-sm rounded-lg bg-neutral-800">{isPending ? "" : formatDuration(TopSongs?.reduce((acc, curr) => (curr.duration < acc.duration) ? curr : acc)?.duration)}</span>
                            </CardTitle>
                            {isPending ?
                                <Skeleton className="h-16" />
                                :
                                <div className="relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-900">
                                    <Avatar>
                                        <AvatarImage src={TopSongs?.reduce((acc, curr) => (curr.duration < acc.duration) ? curr : acc)?.image} />
                                        <AvatarFallback>{TopSongs?.reduce((acc, curr) => (curr.duration < acc.duration) ? curr : acc)?.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-bold text-neutral-100">{TopSongs?.reduce((acc, curr) => (curr.duration < acc.duration) ? curr : acc)?.name}</span>
                                        <div className="flex gap-2">{
                                            TopSongs?.reduce((acc, curr) => (curr.duration < acc.duration) ? curr : acc)?.artists.map((artist: any, index: number, array) => (
                                                <div className="flex gap-2" key={artist.name}>
                                                    <a href={artist.url} target="_blank" className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</a>
                                                    {index !== array.length - 1 ?
                                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                        ""
                                                    }
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                    <a href={TopSongs?.reduce((acc, curr) => (curr.duration < acc.duration) ? curr : acc)?.url} target="_blank" className="absolute w-full h-full" key={TopSongs?.reduce((acc, curr) => (curr.duration < acc.duration) ? curr : acc)?.name}></a>
                                </div>
                            }
                        </CardHeader>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}

export default Taste;