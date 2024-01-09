import { TopArtist } from "@/components/profile/TopArtists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cx } from "class-variance-authority";
import Cookies from "js-cookie";
import { FC, useState } from "react";


interface ArtistsPageProps {

}

const ArtistsPage: FC<ArtistsPageProps> = () => {
    const token = Cookies.get("spotifyAuthToken")
    const [timeRange, setTimeRange] = useState<string>("long_term")

    const { data, refetch } = useQuery({
        queryKey: ["TopArtists"],
        queryFn: async () => {
            const data = await axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=100`, { headers: { Authorization: `Bearer ${token}` } })
            TopArtist = data?.data.items
                .map((item: any) => ({
                    name: item.name,
                    image: item.images[2].url,
                    url: item.external_urls.spotify
                }))
            return data
        },
    })

    let TopArtist: TopArtist[] = data?.data.items
        .map((item: any) => ({
            name: item.name,
            image: item.images[2].url,
            url: item.external_urls.spotify
        })) ?? []

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
                        <CardTitle className="font-bold">Top Artists</CardTitle>
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
                    </CardHeader>
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
                                <span className="font-bold text-neutral-100">{item.name}</span>
                                <a href={item.url} target="_blank" className="absolute w-full h-full" key={item.name}></a>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ArtistsPage;