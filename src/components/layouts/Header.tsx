import { FC } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { buttonVariants } from "../ui/button";
import { NavLink, useLocation } from "react-router-dom";
import LoginHeader from "../ui/LoginHeader";
import { Input } from "../ui/input";
import { Star } from "lucide-react";
import ProfileHeader from "../ui/ProfileHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
    const location = useLocation();
    const isLogin: boolean = !!Cookies.get("spotifyAuthToken");

    const token = Cookies.get("spotifyAuthToken");
    const { data: CurrentUser, isPending } = useQuery({
        queryKey: ['CurrentUser'],
        queryFn: async () => await axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${token}` } })
    });

    return (
        <header className="relative overflow-hidden bg-center bg-cover bg-neutral-900">
            <div className="container z-50 px-4 mt-4">
                <CardHeader className="flex flex-col items-center justify-between md:flex-row">
                    <CardTitle>
                        <NavLink
                            to="/"
                            className="flex items-center mb-4 text-primary md:mb-0"
                        >
                            <img src="/spotivibe.png" className="w-8 mx-1" alt="" />
                            <span>Spoti</span>
                            <span className="text-primary-foreground">vibe</span>
                        </NavLink>
                    </CardTitle>
                    {isLogin ? (
                        <div className="flex flex-col items-center gap-2 mt-4 sm:flex-row md:mt-0">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="dark text-neutral-300"
                            />
                            <NavLink
                                className={location.pathname === "/profile" ? buttonVariants({ variant: "secondary", className: "dark" }) : buttonVariants({ variant: "ghost" })}
                                to="/profile"
                            >
                                My Profile
                            </NavLink>
                            <NavLink
                                className={location.pathname === "/settings" ? buttonVariants({ variant: "secondary", className: "dark" }) : buttonVariants({ variant: "ghost" })}
                                to="/settings"
                            >
                                Settings
                            </NavLink>
                            <NavLink
                                className={location.pathname === "/account" ? buttonVariants({ variant: "secondary", className: "dark" }) : buttonVariants({ variant: "ghost" })}
                                to="/account"
                            >
                                Account
                            </NavLink>
                            <a
                                href="https://github.com/procrastinathree/spotivibe"
                                target="_blank"
                                className={buttonVariants({ variant: "secondary", className: "dark flex gap-2" })}
                            >
                                <Star size={16} />
                                Star us on GitHub
                            </a>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Input
                                type="search"
                                placeholder="Search..."
                                className="dark text-neutral-300"
                            />
                            <a
                                href="https://github.com/procrastinathree/spotivibe"
                                target="_blank"
                                className={buttonVariants({ variant: "secondary", className: "dark flex gap-2" })}
                            >
                                <Star size={16} />
                                Star us on GitHub
                            </a>
                        </div>
                    )}
                </CardHeader>
                {(() => {
                    if (location.pathname === "/") {
                        if (isLogin) {
                            return (
                                <CardContent>
                                    <p className="text-center md:text-start">
                                        <span className="font-semibold text-neutral-300">
                                            Welcome back {isPending ? "Guest" : CurrentUser?.data.display_name}
                                        </span>
                                        <NavLink
                                            className={buttonVariants({
                                                variant: "link",
                                                className: "!text-base",
                                            })}
                                            to="/profile"
                                        >
                                            Go to profile
                                        </NavLink>
                                    </p>
                                </CardContent>
                            );
                        } else {
                            return <LoginHeader />;
                        }
                    } else if (location.pathname.startsWith("/profile")) {
                        return <ProfileHeader />;
                    } else {
                        return null;
                    }
                })()}
            </div>
        </header>
    );
};

export default Header;
