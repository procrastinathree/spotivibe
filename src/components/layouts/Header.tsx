import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { NavLink, useLocation } from "react-router-dom";
import WelcomeHeader from "../ui/WelcomeHeader";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {
    const location = useLocation()

    const isLogin: boolean = false
    return (
        <header className="bg-slate-200">
            <div className="container px-4 mt-4">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                        <NavLink to="/">
                            <span className="text-primary">Spoti</span>
                            <span>vibe</span>
                        </NavLink>
                    </CardTitle>
                    {isLogin ?
                        <div className="flex items-center gap-2">
                            <Input type="search" placeholder="Search..." />
                            <NavLink className={buttonVariants({ variant: "ghost" })} to="/profile">My Profile</NavLink>
                            <NavLink className={buttonVariants({ variant: "ghost" })} to="/profile">Settings</NavLink>
                            <NavLink className={buttonVariants({ variant: "ghost" })} to="/profile">Account</NavLink>
                        </div>
                        :
                        <div className="flex gap-2">
                            <Input type="search" placeholder="Search..." />
                            {/* this button is to authorize with spotify */}
                            <Button type="button" size={"lg"}>Sign in with Spotify</Button>
                        </div>
                    }

                </CardHeader>
                {(
                    () => {
                        if (location.pathname === "/") {
                            if (isLogin) {
                                return <CardContent>
                                    <p>Welcome back #username! <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Go to profile</NavLink></p>
                                </CardContent>
                            } else {
                                return <WelcomeHeader />
                            }
                        } else if (location.pathname === "/profile") {
                            return <div className="flex justify-between">
                                <div className="flex flex-col flex-grow gap-8">
                                    <div className="flex justify-between">
                                        <div className="flex items-end">
                                            <img src="" alt="profile photo" className="w-40 h-40 rounded-full bg-slate-300" />
                                            <h1 className="px-4 text-4xl font-semibold">First Name Last Name</h1>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 px-4">
                                            <NavLink to={"/blog"} className="font-semibold hover:text-primary">
                                                Open in spotify
                                            </NavLink>
                                            <span className="font-semibold">1 Followers</span>
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
                        }
                        else {
                            return <h1>Settings</h1>
                        }
                    }
                )()}

            </div>
        </header>
    );
}

export default Header;