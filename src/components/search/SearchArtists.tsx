import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
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
    searchQuery: string;
}

const SearchArtists: FC<SearchArtistsProps> = ({ data, searchQuery }) => {
    const artists = data?.items
    // console.log(artists)

    return (
        <div className="flex flex-col">
            <Card className="px-8 py-2 rounded-b-none bg-primary w-96">
                <CardTitle className="font-bold text-primary-foreground">Artist</CardTitle>
            </Card>
            <Card className="rounded-tl-none">
                <CardHeader className="grid grid-cols-5">
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
                {/* <CardFooter className="flex flex-row justify-center">
                <Link to={`/search?q=${encodeURIComponent(searchQuery)}&type=artist&page=2`} className={buttonVariants({ variant: "ghost", size: "lg", className: "text-lg w-full text-primary hover:text-primary" })}>VIEW MORE</Link>
            </CardFooter> */}
            </Card>
        </div>
    );
}

export default SearchArtists;