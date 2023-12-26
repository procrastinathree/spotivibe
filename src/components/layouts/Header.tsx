import { FC } from "react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import { NavLink, useLocation } from "react-router-dom";
import LoginHeader from "../ui/LoginHeader";
import { Input } from "../ui/input";
import { Star } from "lucide-react";
import ProfileHeader from "../ui/ProfileHeader";
import SpotifyIcon from "../icons/SpotifyIcon";
import backgroundImg from '../../assets/images/background.jpg'; 

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const location = useLocation();
  const isLogin: boolean = !!localStorage.getItem("spotifyAuthToken");

  return (
    <header
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${backgroundImg})`,
      }}
    >
      <div className="container z-50 px-4 mt-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <NavLink
              to="/"
              className="text-primary flex items-center"
            >
              <SpotifyIcon size={32} />
              <span>Spoti</span>
              <span className="text-primary-foreground">vibe</span>
            </NavLink>
          </CardTitle>
          {isLogin ? (
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search..."
                className="dark text-neutral-300"
              />
              <NavLink
                className={buttonVariants({ variant: "ghost" })}
                to="/profile"
              >
                My Profile
              </NavLink>
              <NavLink
                className={buttonVariants({ variant: "ghost" })}
                to="/settings"
              >
                Settings
              </NavLink>
              <NavLink
                className={buttonVariants({ variant: "ghost" })}
                to="/account"
              >
                Account
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Search..."
                className="dark text-neutral-300"
              />
              <Button
                type="button"
                variant={"secondary"}
                className="flex gap-2"
              >
                <Star size={16} />
                Star us on GitHub
              </Button>
            </div>
          )}
        </CardHeader>
        {(() => {
          if (location.pathname === "/") {
            if (isLogin) {
              return (
                <CardContent>
                  <p>
                    <span className="font-semibold text-neutral-300">
                      Welcome back #username!
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
