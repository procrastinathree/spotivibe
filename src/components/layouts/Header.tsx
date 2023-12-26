import { FC } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { NavLink, useLocation } from "react-router-dom";
import LoginHeader from "../ui/LoginHeader";
import { Input } from "../ui/input";
import { Star } from "lucide-react";
import ProfileHeader from "../ui/ProfileHeader";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const location = useLocation();

  const isLogin: boolean = !!localStorage.getItem("spotifyAuthToken");
    return (
        <header className="bg-neutral-900">
            <div className="container px-4 mt-4">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>
                        <NavLink to="/">
                            <span className="text-primary">Spoti</span>
                            <span className="text-primary-foreground">vibe</span>
                        </NavLink>
                    </CardTitle>
                    {isLogin ?
                        <div className="flex items-center gap-2">
                            <Input type="search" placeholder="Search..." className="dark text-neutral-300" />
                            <NavLink className={buttonVariants({ variant: "ghost" })} to="/profile">My Profile</NavLink>
                            <NavLink className={buttonVariants({ variant: "ghost" })} to="/profile">Settings</NavLink>
                            <NavLink className={buttonVariants({ variant: "ghost" })} to="/profile">Account</NavLink>
                        </div>
                        :
                        <div className="flex gap-2">
                            <Input type="search" placeholder="Search..." className="dark text-neutral-300" />
                            <Button type="button" variant={"secondary"} className="flex gap-2">
                                <Star size={16} />
                                Star us on GitHub
                            </Button>
                        </div>
                    }

                </CardHeader>
                {(
                    () => {
                        if (location.pathname === "/") {
                            if (isLogin) {
                                return <CardContent>
                                    <p>
                                        <span className="font-semibold text-neutral-300">
                                            Welcome back #username!
                                        </span>
                                        <NavLink className={buttonVariants({ variant: "link", className: "!text-base" })} to="/profile">Go to profile</NavLink>
                                    </p>
                                </CardContent>
                            } else {
                                return <LoginHeader />
                            }
                        } else if (location.pathname.startsWith("/profile")) {
                            return <ProfileHeader />
                        }
                        else {
                            return ""
                        }
                    }
                )()}

            </div>
        </header>
    );
}

export default Header;