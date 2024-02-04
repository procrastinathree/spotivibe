import { AudioLines } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { millisecondsToDuration } from "@/lib/utils";
import SpotifyIcon from "../icons/SpotifyIcon";

interface PlaylistSongsProps {
    data: {
        items: {}[]
    };
    link: string
}

const PlaylistSongs: FC<PlaylistSongsProps> = ({ data, link }) => {
    return (
        <div className="flex flex-col ">
            {data.items.map((item: any, index: number, array) => (
                <>
                    <Link to={`/track/${item.track?.id}`} key={item.track?.id} className="flex items-center gap-4 p-2 duration-200 ease-out hover:bg-secondary">
                        <span className="w-8 text-slate-500">{index + 1}</span>
                        <AudioLines size={20} className="text-secondary-foreground" />
                        <div className="flex items-center justify-between flex-grow">
                            <div className="flex gap-6">
                                <CardTitle className="text-base">{item.track.name}</CardTitle>
                                <div className="flex gap-2">
                                    {item.track.artists.map((item: any) => (
                                        <Link to={`/artist/${item.id}`} className="text-base font-semibold text-slate-500 hover:text-primary" key={item.id}>{item.name}</Link>
                                    ))}
                                </div>
                            </div>
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-secondary text-secondary-foreground">{millisecondsToDuration(item.track.duration_ms)}</span>
                        </div>
                    </Link>
                    {index !== array.length - 1 &&
                        <Separator />
                    }
                </>
            ))}
            <a href={link} target="_blank" className="flex justify-center gap-4 py-1 mt-4 font-semibold rounded-lg bg-primary text-primary-foreground">
                <SpotifyIcon size={20} />
                <span>View the full song list on Spotify</span>
            </a>
        </div>
    );
}

export default PlaylistSongs;