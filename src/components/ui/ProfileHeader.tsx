import { FC } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { CardTitle } from "./card";
import { buttonVariants } from "./button";

interface ProfileHeaderProps {

}

const ProfileHeader: FC<ProfileHeaderProps> = () => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col flex-grow gap-8">
                <div className="flex justify-between">
                    <div className="flex items-end">
                        <img src="" alt="profile photo" className="w-40 h-40 rounded-full bg-slate-950 text-slate-500" />
                        <h1 className="px-4 text-4xl font-semibold text-primary-foreground">First Name Last Name</h1>
                    </div>
                    <div className="flex flex-col items-end gap-2 px-4">
                        <NavLink to={"/blog"} className="font-semibold hover:text-primary text-primary-foreground">
                            Open in spotify
                        </NavLink>
                        <span className="font-semibold text-primary-foreground">1 Followers</span>
                        <div className="flex items-center gap-4 p-2 rounded-lg bg-primary">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <CardTitle className="text-base text-primary-foreground">Song Title</CardTitle>
                                <CardTitle className="text-base">Ed Sheeran</CardTitle>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Overview</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/songs">Songs</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/artists">Artists</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/albums">Albums</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/genres">Genres</NavLink>
                    <NavLink className={buttonVariants({ variant: "link" })} to="/profile/labels">Labels</NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;