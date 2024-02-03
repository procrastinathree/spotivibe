import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface SearchArtistsProps {
    data: {
        items: {}[];
        href: string;
        next: string;
        offset: number;
        previous: string;
        total: number
    };
}

const SearchArtists: FC<SearchArtistsProps> = ({ data }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const artists = data?.items
    // console.log(artists)

    const nextPage = () => {
        let page = parseInt(searchParams.get("page") as string) || 1
        return (page + 1).toString()
    }
    const prevPage = () => {
        let page = parseInt(searchParams.get("page") as string) || 1
        return (page > 1 ? page - 1 : 0).toString()
    }

    const handlePage = (params: string) => {
        setSearchParams({ q: (searchParams.get("q") as string), type: "artist", page: params === "next" ? nextPage() : prevPage() })
    }

    return (
        <div className="flex flex-col">
            <Card className="px-8 py-2 rounded-b-none bg-primary w-96">
                <CardTitle className="font-bold text-primary-foreground">Artist</CardTitle>
            </Card>
            <Card className="flex flex-col overflow-hidden rounded-tl-none md:flex-row">
                <CardHeader className="w-full p-0 md:w-12">
                    {(parseInt((searchParams.get("page") as string)) > 1) &&
                        <Button variant={"secondary"} onClick={() => handlePage("prev")} className="h-full rounded-none"><ChevronLeft className="rotate-90 md:rotate-0" /></Button>
                    }
                </CardHeader>
                <CardHeader className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {artists.map((item: any) => (
                        <Link to={`/artist/${item.id}`} className="flex flex-col items-center gap-4 p-2 group" key={item.id}>
                            <Avatar className="w-24 h-24 rounded-sm">
                                <AvatarImage src={item.images[1]?.url || ""} />
                                <AvatarFallback>{(item.name as string).toUpperCase().at(0)}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-lg duration-100 ease-out group-hover:text-primary">{item.name}</CardTitle>
                        </Link>
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

export default SearchArtists;