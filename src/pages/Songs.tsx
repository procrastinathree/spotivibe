import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cx } from "class-variance-authority";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const SongsPage: FC = () => {
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken
    const [timeRange, setTimeRange] = useState<string>("long_term")
    const [sortBy, setSortBy] = useState<string>("spotify_rank")
    const { data, refetch, isPending } = useQuery({
        queryKey: ["TopSongs"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`, { headers: { Authorization: `Bearer ${token}` } })
            return data.data
        },
    })
    const [TopSongs, setTopSongs] = useState<any[]>([])

    useEffect(() => {
        const trimmedData: any[] = data?.items
        if (sortBy === "popularity_high") {
            setTopSongs(trimmedData.sort((a, b) => b.popularity - a.popularity) ?? [])
        } else if (sortBy === "popularity_low") {
            setTopSongs(trimmedData.sort((a, b) => a.popularity - b.popularity) ?? [])
        } else if (sortBy === "length_long") {
            setTopSongs(trimmedData.sort((a, b) => b.duration_ms - a.duration_ms) ?? [])
        } else if (sortBy === "length_short") {
            setTopSongs(trimmedData.sort((a, b) => a.duration_ms - b.duration_ms) ?? [])
        } else if (sortBy === "release_old") {
            setTopSongs(trimmedData.sort((a, b) => new Date(a.album.release_date).getTime() - new Date(b.album.release_date).getTime()) ?? [])
        } else if (sortBy === "release_new") {
            setTopSongs(trimmedData.sort((a, b) => new Date(b.album.release_date).getTime() - new Date(a.release_date).getTime()) ?? [])
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
    const countByDecade = (decade: number, data: any[]) => {
        const startYear = decade;
        const endYear = startYear + 9;

        return data.filter((item: any) => {
            const releaseYear = new Date(item.album.release_date).getFullYear();
            return releaseYear >= startYear && releaseYear <= endYear;
        }).length;
    };
    const countItemsByDuration = (dataArray: any[], thresholdInMinutes: number) => {
        const thresholdInMilliseconds = thresholdInMinutes * 60 * 1000;

        const countLessThanOrEqualThreshold = dataArray.filter(item => item.duration_ms <= thresholdInMilliseconds).length;
        const countGreaterThanOrEqualThreshold = dataArray.filter(item => item.duration_ms >= thresholdInMilliseconds).length;

        return {
            lessThanOrEqualThreshold: countLessThanOrEqualThreshold,
            greaterThanOrEqualThreshold: countGreaterThanOrEqualThreshold
        };
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8 lg:flex-row">
                <Card className="flex flex-col w-full gap-6">
                    <CardHeader className="flex flex-col items-center justify-between md:flex-row">
                        <CardTitle className="mb-4 font-bold">Top Songs</CardTitle>
                        <div className="flex w-full gap-4 md:w-fit"> {/* Step 1 */}
                            <Select onValueChange={handleTimeRangeChange} defaultValue={timeRange}>
                                <SelectTrigger className="w-full md:w-fit"> {/* Step 2 */}
                                    <SelectValue placeholder={timeRange.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="short_term">Short Term</SelectItem>
                                    <SelectItem value="medium_term">Medium Term</SelectItem>
                                    <SelectItem value="long_term">Long Term</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={handleSortByChange} defaultValue={sortBy}>
                                <SelectTrigger className="w-full md:w-fit"> {/* Step 2 */}
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
                    <CardContent className="flex flex-col gap-6 lg:flex-row">
                        {isPending ?
                            <div className="flex flex-row w-full gap-6 lg:w-1/3">
                                <Skeleton className="relative w-full h-56">
                                    <span
                                        className={"absolute text-5xl font-bold -translate-x-1/2 text-[#FFD700]/50 -translate-y-1/2 top-1/2 left-1/2"}
                                    >1</span>
                                </Skeleton>
                                <Skeleton className="relative w-full h-56">
                                    <span
                                        className={"absolute text-5xl font-bold -translate-x-1/2 text-[#C0C0C0]/50 -translate-y-1/2 top-1/2 left-1/2"}
                                    >2</span>
                                </Skeleton>
                                <Skeleton className="relative w-full h-56">
                                    <span
                                        className={"absolute text-5xl font-bold -translate-x-1/2 text-[#CD7F32]/50 -translate-y-1/2 top-1/2 left-1/2"}
                                    >3</span>
                                </Skeleton>
                            </div> :
                            <div className="flex flex-row w-full gap-6 lg:w-1/3">
                                {TopSongs.slice(0, 3).map((item: any, index: number) => (
                                    <Link
                                        to={`/track/${item.id}`}
                                        className="relative w-full h-56 duration-200 ease-out drop-shadow-lg hover:scale-[1.02]"
                                        key={item.name}>
                                        <img src={item.album.images[1].url} className="object-cover w-full h-full rounded-lg" alt={item.name} />
                                        <span
                                            className={cx("absolute text-5xl font-bold -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2", {
                                                "text-[#FFD700]/50": index === 0,
                                                "text-[#C0C0C0]/50": index === 1,
                                                "text-[#CD7F32]/50": index === 2,
                                            })}
                                        >
                                            {index + 1}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        }
                        <Card className="flex flex-col w-full overflow-hidden rounded-lg lg:w-2/3 md:flex-row bg-background">
                            <div className="w-full bg-background ">
                                <CardHeader>
                                    <CardTitle className="font-bold">By Popularity</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-24 overflow-ellipsis">Obscure</CardTitle> {/* Step 3 */}
                                        <Progress value={isPending ? 0 : TopSongs.filter((songs: any) => songs.popularity <= 50).length * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 2 */}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-24 overflow-ellipsis">Average</CardTitle> {/* Step 3 */}
                                        <Progress value={isPending ? 0 : TopSongs.filter((songs: any) => songs.popularity < 80 && songs.popularity > 50).length * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 2 */}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-24 overflow-ellipsis">Popular</CardTitle> {/* Step 3 */}
                                        <Progress value={isPending ? 0 : TopSongs.filter((songs: any) => songs.popularity >= 80).length * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 2 */}
                                    </div>
                                </CardContent>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="w-full bg-background ">
                                <CardHeader>
                                    <CardTitle className="font-bold">By Decade</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-20 overflow-ellipsis">2020s</CardTitle> {/* Step 3 */}
                                        <Progress value={isPending ? 0 : countByDecade(2020, TopSongs) * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 2 */}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-20 overflow-ellipsis">2010s</CardTitle> {/* Step 3 */}
                                        <Progress value={isPending ? 0 : countByDecade(2010, TopSongs) * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 2 */}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-20 overflow-ellipsis">2000s</CardTitle> {/* Step 3 */}
                                        <Progress value={isPending ? 0 : countByDecade(2000, TopSongs) * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 2 */}
                                    </div>
                                </CardContent>
                            </div>
                            <Separator orientation="vertical" />
                            <div className="w-full bg-background ">
                                <CardHeader>
                                    <CardTitle className="font-bold">By Length</CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-16 text-start overflow-ellipsis">-4min</CardTitle> {/* Step 2 */}
                                        <Progress value={isPending ? 0 : countItemsByDuration(TopSongs, 4).lessThanOrEqualThreshold * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 1 */}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <CardTitle className="w-1/2 overflow-hidden text-base lg:w-16 text-start overflow-ellipsis">4m+</CardTitle> {/* Step 2 */}
                                        <Progress value={isPending ? 0 : countItemsByDuration(TopSongs, 4).greaterThanOrEqualThreshold * 2} className="w-full h-2 lg:w-2/3" /> {/* Step 1 */}
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </CardContent>
                    {isPending ?
                        <CardContent className="flex flex-col gap-4">
                            <Skeleton className="h-16" />
                            <Skeleton className="h-16" />
                            <Skeleton className="h-16" />
                        </CardContent>
                        :
                        <CardContent className="flex flex-col gap-4">
                            {TopSongs.map((item: any, index: number) => (
                                <div className={cx("relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-950/30", {
                                    'bg-gradient-to-r from-[#FFD700]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#FFD700]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 0,
                                    'bg-gradient-to-r from-[#C0C0C0]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#C0C0C0]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 1,
                                    'bg-gradient-to-r from-[#CD7F32]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#CD7F32]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 2,
                                })} key={index}>
                                    <span className="w-5 font-semibold text-end text-neutral-500">{index + 1}</span>
                                    <Avatar>
                                        <AvatarImage src={item.album.images[2]?.url} />
                                        <AvatarFallback>{item.name.at(0)?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex flex-col gap-2">
                                            <span className="overflow-hidden font-bold text-neutral-100 overflow-ellipsis">{item.name}</span>
                                            <div className="flex gap-2">{
                                                item.artists.map((artist: any, index: number, array: []) => (
                                                    <div className="flex gap-2" key={index}>
                                                        <Link
                                                            to={`/artist/${artist.id}`}
                                                            target="_blank"
                                                            className="z-10 overflow-hidden overflow-x-hidden font-bold rounded-lg text-neutral-500 hover:text-primary overflow-ellipsis"
                                                            key={artist.name}>
                                                            {artist.name}
                                                        </Link>
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
                                                    sortBy.startsWith("release") ? <span className="font-bold text-neutral-100 overflow-hidden overflow-ellipsis max-w-[100px]">{item.release_date}</span> : ""}
                                        </div>
                                    </div>
                                    <Link to={`/track/${item.id}`} className="absolute w-full h-full" key={item.name}></Link>
                                </div>
                            ))}
                        </CardContent>
                    }
                </Card>
            </div>
        </div>
    );
}

export default SongsPage;