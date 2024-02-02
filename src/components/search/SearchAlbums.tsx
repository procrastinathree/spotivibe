import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface SearchAlbumsProps {
    data: {
        items: {}[];
        href: string;
        next: string;
        offset: number;
        previous: string;
        total: number
    };
    searchQuery: string;
}

const SearchAlbums: FC<SearchAlbumsProps> = ({ data, searchQuery }) => {
    const Albums = data.items
    console.log(Albums)

    return (
        <div className="flex flex-col">
            <Card className="px-8 py-2 rounded-b-none bg-primary w-96">
                <CardTitle className="font-bold text-primary-foreground">Albums</CardTitle>
            </Card>
            <Card className="rounded-tl-none">
                <CardHeader className="grid grid-cols-3 gap-4">
                    {Albums.map((item: any, index: number) => (
                        <div className="relative flex items-start gap-4 p-2 duration-300 ease-out rounded-lg hover:bg-neutral-950/30" key={index}>
                            <Avatar className="w-24 h-24 rounded-sm">
                                <AvatarImage src={item.images[1].url} />
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
                            <Link to={`/album/${item.id}`} className="absolute w-full h-full" key={item.name}></Link>
                        </div>
                    ))}
                </CardHeader>
                {/* <CardFooter className="flex flex-row justify-center">
                <Link to={`/search?q=${encodeURIComponent(searchQuery)}&type=artist&page=2`} className={buttonVariants({ variant: "ghost", size: "lg", className: "text-lg w-full text-primary hover:text-primary" })}>VIEW MORE</Link>
            </CardFooter> */}
            </Card>
        </div>
    );
}

export default SearchAlbums;