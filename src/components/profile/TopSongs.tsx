import { FC, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import axios from "axios";
export type TopSongs = {
    name: string;
    image: string
    url: string;
}

const TopSongsList: FC = () => {
    const token = localStorage.getItem("spotifyAuthToken")
    const [timeRange, setTimeRange] = useState<string>("long_term")

    const { data, refetch } = useQuery({
        queryKey: ["TopSongs"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=10`, { headers: { Authorization: `Bearer ${token}` } })
            TopSongs = data?.data.items
                .map((item: any) => ({
                    name: item.name,
                    image: item.album.images[2].url,
                    url: item.external_urls.spotify
                }))
            return data
        }
    })


    let TopSongs: TopSongs[] = data?.data.items
        .map((item: any) => ({
            name: item.name,
            image: item.album.images[2].url,
            url: item.external_urls.spotify
        })) ?? []

    const handleTimeRangeChange = (value: string) => {
        setTimeRange(value)
        setTimeout(() => {
            refetch()
        }, 500);
    }

    return (
        <Card className="w-1/2">
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
            <CardContent className="flex flex-col gap-4">
                {TopSongs.map((item: TopSongs, index: number) => (
                    <div className="flex items-center gap-4" key={index}>
                        <span className="font-semibold text-neutral-500">{index + 1}</span>
                        <Avatar>
                            <AvatarImage src={item.image} />
                            <AvatarFallback>{item.name.at(0)?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <a href={item.url} target="_blank" className="font-bold hover:underline text-neutral-100" key={item.name}>{item.name}</a>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="flex flex-row justify-center">
                <NavLink to={"/profile/artists"} className={buttonVariants({ variant: "link", className: "text-lg" })}>SEE ALL</NavLink>
            </CardFooter>
        </Card>
    );
}

export default TopSongsList;