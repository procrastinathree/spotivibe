import { FC, useEffect, useState } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { buttonVariants } from "../ui/button";
import { NavLink, useLocation } from "react-router-dom";
import LoginHeader from "../ui/LoginHeader";
import { Input } from "../ui/input";
import { AlignJustify, Star } from "lucide-react";
import ProfileHeader from "../ui/ProfileHeader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
    const location = useLocation();
    const isLogin: boolean = !!Cookies.get("spotifyAuthToken");
    const [isMinWidth640, setIsMinWidth640] = useState<boolean>(false);

    const token = Cookies.get("spotifyAuthToken");
    const { data: CurrentUser, isPending } = useQuery({
        queryKey: ['CurrentUser'],
        queryFn: async () => await axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${token}` } })
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMinWidth640(event.matches);
        };

        // Initial check
        handleMediaQueryChange(mediaQuery as any);

        // Add listener for changes
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        // Cleanup on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    return (
        <header className="relative overflow-hidden bg-center bg-cover bg-neutral-900">
            <div className="container z-50 px-4 mt-4">
                <CardHeader className="flex-row justify-between flexitems-center">
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
                    <div className="flex gap-4">
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="dark text-neutral-300 max-w-52" />
                        {isLogin ? isMinWidth640 ?
                            <DropdownMenu>
                                <DropdownMenuTrigger className="dark">
                                    <AlignJustify className="text-neutral-100" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="flex flex-col gap-2 dark" align="end">
                                    <DropdownMenuItem>
                                        <NavLink
                                            className="w-full"
                                            to="/profile">
                                            My Profile
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <NavLink
                                            className="w-full"
                                            to="/account">
                                            Account
                                        </NavLink>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <a
                                            href="https://github.com/procrastinathree/spotivibe"
                                            target="_blank"
                                            className="flex items-center w-full gap-2 p-2">
                                            <Star size={16} />
                                            Star us on GitHub
                                        </a>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            : (
                                <div className="flex flex-col items-center gap-2 mt-4 sm:flex-row md:mt-0">
                                    <NavLink
                                        className={location.pathname === "/profile" ? buttonVariants({ variant: "secondary", className: "dark" }) : buttonVariants({ variant: "ghost" })}
                                        to="/profile">
                                        My Profile
                                    </NavLink>
                                    <NavLink
                                        className={location.pathname === "/account" ? buttonVariants({ variant: "secondary", className: "dark" }) : buttonVariants({ variant: "ghost" })}
                                        to="/account">
                                        Account
                                    </NavLink>
                                    <a
                                        href="https://github.com/procrastinathree/spotivibe"
                                        target="_blank"
                                        className={buttonVariants({ variant: "secondary", className: "dark flex gap-2" })}>
                                        <Star size={16} />
                                        Star us on GitHub
                                    </a>
                                </div>
                            ) : isMinWidth640 ? "keren" : (
                                <div className="flex gap-2">
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
                    </div>
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
