import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface AlbumSongsProps {
    data: {
        items: {}[]
    };
    image: string
}

const AlbumSongs: FC<AlbumSongsProps> = ({ data, image }) => {
    console.log(data)
    return (
        <div className="flex flex-col ">
            {data.items.map((item: any, index: number, array) => (
                <>
                    <Link to={`/track/${item.id}`} key={item.id} className="flex items-center gap-4 p-2 duration-200 ease-out hover:bg-secondary">
                        <span className="w-8 text-slate-500">{index + 1}</span>
                        <Avatar>
                            <AvatarImage src={image} />
                            <AvatarFallback>{(item.name as string).toUpperCase().at(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex items-center gap-6">
                            <CardTitle className="text-base">{item.name}</CardTitle>
                            <div className="flex gap-2">
                                {item.artists.map((item: any) => (
                                    <Link to={`/artist/${item.id}`} className="text-base font-semibold text-slate-500 hover:text-primary">{item.name}</Link>
                                ))}
                            </div>
                        </div>
                    </Link>
                    {index !== array.length - 1 &&
                        <Separator />
                    }
                </>
            ))}
        </div>
    );
}

export default AlbumSongs;