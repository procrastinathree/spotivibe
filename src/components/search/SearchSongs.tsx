import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface SearchSongsProps {
    data: {
        items: {}[];
        href: string;
        next: string;
        offset: number;
        previous: string;
        total: number
    };
}

const SearchSongs: FC<SearchSongsProps> = ({ data }) => {
    const songs = data.items
    const [searchParams, setSearchParams] = useSearchParams()
    const nextPage = () => {
        let page = parseInt(searchParams.get("page") as string) || 1
        return (page + 1).toString()
    }
    const prevPage = () => {
        let page = parseInt(searchParams.get("page") as string) || 1
        return (page > 1 ? page - 1 : 0).toString()
    }

    const handlePage = (params: string) => {
        setSearchParams({ q: (searchParams.get("q") as string), type: "track", page: params === "next" ? nextPage() : prevPage() })
    }

    return (
        <div className="flex flex-col">
            <Card className="px-8 py-2 rounded-b-none bg-primary w-96">
                <CardTitle className="font-bold text-primary-foreground">Songs</CardTitle>
            </Card>
            <Card className="flex flex-col overflow-hidden rounded-tl-none md:flex-row">
                <CardHeader className="w-full p-0 md:w-12">
                    {(parseInt((searchParams.get("page") as string)) > 1) &&
                        <Button variant={"secondary"} onClick={() => handlePage("prev")} className="h-full rounded-none"><ChevronLeft className="rotate-90 md:rotate-0" /></Button>
                    }
                </CardHeader>
                <CardHeader className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {songs.map((item: any, index: number) => (
                        <div className="relative flex items-center gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-950/30" key={index}>
                            <Avatar>
                                <AvatarImage src={item.album.images[2].url} />
                                <AvatarFallback>{item.name.at(0)?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2">
                                <span className="font-bold text-neutral-100">{item.name}</span>
                                <div className="flex gap-2">{
                                    item.artists.map((artist: any, index: number, array: []) => (
                                        <div className="flex gap-2" key={artist.name}>
                                            <Link to={`/artist/${item.id}`} className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary " key={artist.name}>{artist.name}</Link>
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
                </CardHeader>
                <CardHeader className="p-0 md:w-12">
                    {data.next &&
                        <Button variant={"secondary"} onClick={() => handlePage("next")} className="h-full rounded-none"><ChevronRight className="rotate-90 md:rotate-0" /></Button>
                    }
                </CardHeader>
            </Card>
        </div>
    );
}

export default SearchSongs;