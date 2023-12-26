import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TopSectionTwoProps {

}

const TopSectionTwo: FC<TopSectionTwoProps> = () => {
    return (
        <div className="flex gap-16">
            <Card className="w-2/3 overflow-hidden">
                <div className="flex gap-8">
                    <div className="flex flex-col">
                        <CardHeader>
                            <CardDescription className="text-lg font-bold">Genre of the Day</CardDescription>
                            <CardTitle>Genre name</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-8">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis aliquam nemo temporibus necessitatibus placeat, vero officia atque aut amet corporis! Blanditiis adipisci doloremque ullam eligendi explicabo delectus recusandae qui laboriosam itaque possimus quam, voluptas vitae reprehenderit cum, obcaecati laborum! Voluptatem voluptatibus neque nam! Qui repellat incidunt deserunt necessitatibus neque eius.</p>
                            <div className="flex flex-col gap-4">
                                {/* loop song with this genre with this */}
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
                        </CardContent>
                    </div>
                </div>
            </Card>
            <Card className="w-1/3 overflow-hidden">
                <CardHeader>
                    <CardTitle>Popular Now</CardTitle>
                    <CardDescription className="text-lg font-bold">What the world is listening to</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        {/* loop song with this genre with this loop 10x */}
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
                </CardContent>
            </Card>
        </div>
    );
}

export default TopSectionTwo;