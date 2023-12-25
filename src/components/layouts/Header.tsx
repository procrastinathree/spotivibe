import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { NavLink, useLocation } from "react-router-dom";
import WelcomeHeader from "../ui/WelcomeHeader";
import { Input } from "../ui/input";

interface HeaderProps {

}

const Header: FC<HeaderProps> = () => {
    const location = useLocation()

    const isLogin: boolean = true
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
                                <div className="flex flex-col flex-grow">
                                    <h1 className="p-6 text-4xl">#username</h1>
                                    <div className="flex">
                                        <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Overview</NavLink>
                                        <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Songs</NavLink>
                                        <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Artist</NavLink>
                                        <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Albums</NavLink>
                                        <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Genres</NavLink>
                                        <NavLink className={buttonVariants({ variant: "link" })} to="/profile">Labels</NavLink>
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