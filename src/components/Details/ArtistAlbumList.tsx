import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import { getYear } from "date-fns";

interface ArtistAlbumListProps {
    data: {
        items: {}[]
    }
}

const ArtistAlbumList: FC<ArtistAlbumListProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item: any) => (
                <div className="relative flex items-center gap-4 p-2 px-4 duration-300 ease-out rounded-lg hover:bg-secondary/50" key={item.id}>
                    <Avatar className="w-24 h-24 rounded-sm">
                        <AvatarImage src={item.images[1].url} />
                        <AvatarFallback>{item.name.at(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-neutral-100">{item.name}</span>
                        <div className="flex gap-2">{
                            item.artists.map((artist: any, index: number, array: []) => (
                                <div className="flex gap-2" key={artist.id}>
                                    <Link to={`/artist/${artist.id}`} className="z-10 font-bold rounded-lg text-neutral-500 hover:text-primary ">{artist.name}</Link>
                                    {index !== array.length - 1 ?
                                        <Separator orientation="vertical" className="dark" key={artist.name} /> :
                                        null
                                    }
                                </div>
                            ))
                        }</div>
                        <div className="p-1 px-2 text-sm font-bold rounded-sm text-secondary-foreground bg-secondary w-fit">
                            {getYear(new Date(item.release_date))}
                        </div>
                    </div>
                    <Link to={`/album/${item.id}`} className="absolute w-full h-full"></Link>
                </div>
            ))}
        </div>
    );
}

export default ArtistAlbumList;