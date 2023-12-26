import { TopArtist } from "@/components/profile/TopArtists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";


interface ArtistPageProps {

}

const ArtistPage: FC<ArtistPageProps> = () => {
    const token = localStorage.getItem("spotifyAuthToken")
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
                </Card>
            </div>
        </div>
    );
}

export default ArtistPage;