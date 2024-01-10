import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import axios from "axios";

interface TopSectionOneProps {

}

interface SpotifyArtist {
    name: string;
    image: string;
    url: string;
    topSong?: {
        name: string;
        previewUrl: string;
        albumImage: string;
        play: string;
    };
}

interface SpotifyTrack {
    title: string;
    artistName: string;
    albumImage: string;
    type: string;
    typeName: string;
    releaseDate: string;
    artistImage: string;
    play: string;
}

const TopSectionOne: FC<TopSectionOneProps> = () => {
    const [topArtist, setTopArtist] = useState<SpotifyArtist | null>(null);
    const [topTrack, setTopTrack] = useState<SpotifyTrack | null>(null);
    const token = localStorage.getItem("spotifyAuthToken");

    useEffect(() => {
        if (!token) return;

        const fetchTopArtist = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/me/top/artists?limit=1`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const artist = response.data.items[0];

            const topTracksResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const topTrack = topTracksResponse.data.tracks[0];

            setTopArtist({
                name: artist.name,
                image: artist.images[0].url,
                url: artist.external_urls.spotify,
                topSong: {
                    name: topTrack.name,
                    previewUrl: topTrack.preview_url,
                    albumImage: topTrack.album.images[0].url,
                    play: topTrack.preview_url
                }
            });
        };


        const fetchTopTrack = async () => {
            const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=1`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const track = response.data.items[0];

            const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${track.artists[0].id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const artistImage = artistResponse.data.images[0].url;

            setTopTrack({
                title: track.name,
                artistName: track.artists[0].name,
                artistImage: artistImage,
                albumImage: track.album.images[0].url,
                type: track.album.type,
                typeName: track.album.name,
                releaseDate: track.album.release_date,
                play: track.preview_url
            });
        };


        fetchTopArtist();
        fetchTopTrack();
    }, [token]);


    if (!topArtist || !topTrack) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <Card className="w-full lg:w-1/3 overflow-hidden">
                <CardHeader className="relative p-0">
                    <img
                        src={topArtist.image}
                        alt="artist image"
                        className="object-cover w-full opacity-30 bg-neutral-900 h-80" />
                    <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-8">
                        <CardDescription className="p-2 text-base font-bold rounded-lg w-fit bg-neutral-800 text-secondary">Current Most Favorite Artist</CardDescription>
                        <CardTitle className="p-3 text-3xl rounded-lg w-fit bg-primary text-primary-foreground">{topArtist.name}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-8 mt-8">
                        <div className="flex flex-col gap-2">
                            <CardDescription className="text-lg font-bold">Information</CardDescription>
                            <p>Your favorite artist from last week. Dive into their mesmerizing soundscape and let their music transport you to new realms of creativity and emotion</p>
                            {/* artist facts */}
                        </div>
                        <div className="flex flex-col gap-4">
                            {/* loop his song with this */}
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={topArtist.topSong?.albumImage} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <CardTitle className="text-base">{topArtist.topSong?.name}</CardTitle>
                                    <CardDescription className="text-sm">{topArtist.name}</CardDescription>
                                </div>
                            </div>
                            {topArtist.topSong && (
                                <div className="flex flex-col gap-2">
                                    <audio controls src={topArtist.topSong.previewUrl}>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-full lg:w-2/3 overflow-hidden">
                <CardHeader className="relative p-0">
                    <img src={topTrack.albumImage}
                        alt="artist image"
                        className="object-cover w-full opacity-30 bg-neutral-900 h-80" />
                    <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-8">
                        <CardDescription className="p-2 text-base font-bold rounded-lg w-fit bg-neutral-800 text-secondary">Current Most Favorite Song</CardDescription>
                        <CardTitle className="p-3 text-3xl rounded-lg w-fit bg-primary text-primary-foreground">{topTrack.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-8 mt-8">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                {/* artist photo */}
                                <AvatarImage src={topTrack.artistImage} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                {/* artist name */}
                                <CardTitle className="text-base">{topTrack.artistName}</CardTitle>
                            </div>
                        </div>
                        {topTrack.play && (
                                <div className="flex flex-col gap-2">
                                    <audio controls src={topTrack.play}>
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            )}
                        <div className="flex flex-col gap-2">
                            <CardDescription className="text-lg font-bold">Information</CardDescription>
                            {/* song facts */}
                            <p>Your favorite song from the past week. Explore the tracks that resonated with your soul, and relive the moments they brought to life. </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <CardDescription className="text-base">Type:</CardDescription>
                                <CardTitle className="text-base">{topTrack.type}</CardTitle>
                            </div>
                            <div className="flex items-center gap-4">
                                <CardDescription className="text-base">{topTrack.type} Name:</CardDescription>
                                <CardTitle className="text-base">{topTrack.typeName}</CardTitle>
                            </div>
                            <div className="flex items-center gap-4">
                                <CardDescription className="text-base">Released:</CardDescription>
                                <CardTitle className="text-base">{topTrack.releaseDate}</CardTitle>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default TopSectionOne;