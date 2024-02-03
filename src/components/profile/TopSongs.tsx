import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { cx } from "class-variance-authority";
import { FC, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

const TopSongsList: FC = () => {
    const [cookies] = useCookies(["spotifyAuthToken"])
    const token = cookies.spotifyAuthToken
    const [timeRange, setTimeRange] = useState<string>("long_term")

    const { data, refetch, isPending } = useQuery({
        queryKey: ["TopSongs"],
        queryFn: async () => {
            const { data } = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, { headers: { Authorization: `Bearer ${token}` } })
            return data
        }
    })

    const handleTimeRangeChange = (value: string) => {
        setTimeRange(value)
        setTimeout(() => {
            refetch()
        }, 500);
    }

    return (
        <Card className="w-full xl:w-1/2 h-fit">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-bold">Top Songs</CardTitle>
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
            {isPending ?
                <CardContent className="flex flex-row gap-2">
                    <Skeleton className="z-20 w-40 h-40 rounded-full drop-shadow-lg" />
                    <Skeleton className="z-10 w-40 h-40 scale-90 -translate-x-24 rounded-full drop-shadow-lg" />
                    <Skeleton className="w-40 h-40 scale-75 rounded-full -translate-x-52 drop-shadow-lg" />
                </CardContent> :
                <CardContent className="flex flex-row gap-2">
                    {data.items.slice(0, 3).map((item: any, index: number) => (
                        <Link to={`/track/${item.id}`} className={cx('w-40 drop-shadow-lg', {
                            'z-20 hover:scale-[1.02] ease-out duration-300': index === 0,
                            '-translate-x-24 scale-90 z-10 hover:-translate-x-20 ease-out duration-300': index === 1,
                            '-translate-x-52 scale-75 hover:-translate-x-44 ease-out duration-300': index === 2,
                        })} key={item.name}>
                            <img src={item.album.images[1].url} className="w-full rounded-full" alt={item.name} />
                        </Link>
                    ))}
                </CardContent>
            }
            {isPending ?
                <CardContent className="flex flex-col gap-3">
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                    <Skeleton className="h-16 rounded-lg" />
                </CardContent>
                :
                <CardContent className="flex flex-col gap-3">
                    {data.items.map((item: any, index: number) => (
                        <div className={cx("relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-950/30", {
                            'bg-gradient-to-r from-[#FFD700]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#FFD700]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 0,
                            'bg-gradient-to-r from-[#C0C0C0]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#C0C0C0]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 1,
                            'bg-gradient-to-r from-[#CD7F32]/10 via-neutral-900 to-neutral-900 ease-out duration-300 hover:from-[#CD7F32]/10 hover:via-neutral-950/30 hover:to-neutral-950/30': index === 2,
                        })} key={index}>
                            <span className="w-5 font-semibold text-end text-neutral-500">{index + 1}</span>
                            <Avatar>
                                <AvatarImage src={item.album.images[2].url} />
                                <AvatarFallback>{item.name.at(0)?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-neutral-100">{item.name}</span>
                                <div className="flex gap-2">{
                                    item.artists.map((artist: any, index: number, array: []) => (
                                        <div className="flex gap-2" key={artist.name}>
                                            <Link to={`/artist/${artist.id}`} className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</Link>
                                            {index !== array.length - 1 ?
                                                <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                                ""
                                            }
                                        </div>
                                    ))
                                }</div>
                            </div>
                            <Link to={`/track/${item.id}`} className="absolute w-full h-full" key={item.name}></Link>
                        </div>
                    ))}
                </CardContent>
            }
            <CardFooter className="flex flex-row justify-center">
                <NavLink to={"/profile/songs"} className={buttonVariants({ variant: "ghost", size: "lg", className: "text-lg w-full text-primary hover:text-primary" })}>SEE ALL</NavLink>
            </CardFooter>
        </Card>
    );
}

export default TopSongsList;