import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TopSectionOneProps {

}

const TopSectionOne: FC<TopSectionOneProps> = () => {
    return (
        <div className="flex gap-16">
            <Card className="w-1/2">
                <CardHeader className="relative p-0">
                    <img src="" alt="artist image" className="object-cover w-full bg-neutral-200 h-80" />
                    <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-8">
                        <CardDescription className="p-2 text-base font-bold rounded-lg w-fit bg-secondary text-secondary-foreground">Artist of the Day</CardDescription>
                        <CardTitle className="p-3 text-3xl rounded-lg w-fit bg-primary text-primary-foreground">Ed Sheeran</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-8 mt-8">
                        <div className="flex flex-col gap-2">
                            <CardDescription className="text-lg font-bold">Did you know?</CardDescription>
                            {/* artist facts */}
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam ipsam modi debitis? Mollitia harum quos consequatur a rerum expedita voluptates, laborum possimus tenetur! Recusandae!</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            {/* loop his song with this */}
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <CardTitle className="text-base">Song Title</CardTitle>
                                    <CardDescription className="text-sm">Ed Sheeran</CardDescription>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="w-1/2">
                <CardHeader className="relative p-0">
                    <img src="" alt="artist image" className="object-cover w-full bg-neutral-200 h-80" />
                    <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-8">
                        <CardDescription className="p-2 text-base font-bold rounded-lg w-fit bg-secondary text-secondary-foreground">Song of the Day</CardDescription>
                        <CardTitle className="p-3 text-3xl rounded-lg w-fit bg-primary text-primary-foreground">Perfect</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-8 mt-8">
                        <div className="flex items-center gap-4">
                            <Avatar>
                                {/* artist photo */}
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                {/* artist name */}
                                <CardTitle className="text-base">Ed Sheeran</CardTitle>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <CardDescription className="text-lg font-bold">Did you know?</CardDescription>
                            {/* song facts */}
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam ipsam modi debitis? Mollitia harum quos consequatur a rerum expedita voluptates, laborum possimus tenetur! Recusandae!</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <CardDescription className="text-base">Album:</CardDescription>
                                <CardTitle className="text-base">album_name</CardTitle>
                            </div>
                            <div className="flex items-center gap-4">
                                <CardDescription className="text-base">Label:</CardDescription>
                                <CardTitle className="text-base">label_name</CardTitle>
                            </div>
                            <div className="flex items-center gap-4">
                                <CardDescription className="text-base">Released:</CardDescription>
                                <CardTitle className="text-base">year_release_date</CardTitle>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default TopSectionOne;