import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TopSectionOne: FC = () => {
    return (
        <Card className="flex flex-row gap-6">
            <CardHeader>
                <img src="" className="w-72 h-96" alt="" />
            </CardHeader>
            <CardHeader className="flex-grow">
                <CardTitle className="text-xl">Artist of the day</CardTitle>
                <CardTitle className="text-3xl">asdfasdf</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                asdfsadf
            </CardContent>
        </Card>
    );
}

export default TopSectionOne;