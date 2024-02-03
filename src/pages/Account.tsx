import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface AccountPageProps {

}

const AccountPage: FC<AccountPageProps> = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["spotifyAuthToken"])
    const [token, setToken] = useState<string | null>((cookies.spotifyAuthToken) || "");
    const { toast } = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        console.log('ProfilePage: URL hash:', hash);

        const params = new URLSearchParams(hash.substring(1));
        const urlToken = params.get('access_token');
        console.log('ProfilePage: Extracted Token:', urlToken);

        if (urlToken) {
            const expires = new Date(new Date().getTime() + 50 * 60 * 1000);
            setCookie('spotifyAuthToken', urlToken, { expires: expires });
            setToken(urlToken);
            window.history.replaceState({}, document.title, "/profile");
        }
    }, [navigate]);

    const { data: CurrentUser, error: CurrentUserError, isLoading: CurrentUserLoading } = useQuery({
        queryKey: ['CurrentUser'],
        queryFn: async () => await axios.get("https://api.spotify.com/v1/me", { headers: { Authorization: `Bearer ${token}` } })
    })
    console.log(CurrentUser)

    if (CurrentUserError) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
    }

    useEffect(() => {
        if (!token) {
            console.log('ProfilePage: token null');
            navigate('/');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        console.log('ProfilePage: Log Out...');
        removeCookie('spotifyAuthToken')
        navigate('/');
    };

    return (
        <div className="flex flex-col gap-8">
            <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {CurrentUserLoading ?
                        <Skeleton className="w-full rounded-lg md:w-48 h-60 dark" />
                        :
                        <img src={CurrentUser?.data.images[1].url} className="object-cover w-full rounded-lg md:w-48 h-60" alt="Spotify Profile Photo" />
                    }
                    <div className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Spotify Account</CardTitle>
                            <CardDescription>The Spotify account that your're signed in with</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <CardDescription>Username</CardDescription>
                                {CurrentUserLoading ?
                                    <Skeleton className="h-6 mt-1 w-60" />
                                    :
                                    <a href={CurrentUser?.data.external_urls.spotify} target="_blank" className="text-base font-bold duration-200 ease-out text-neutral-100 hover:text-primary">{CurrentUser?.data.id}</a>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <CardDescription>Email</CardDescription>
                                {CurrentUserLoading ?
                                    <Skeleton className="w-48 h-6 mt-1" />
                                    :
                                    <span className="text-base font-bold duration-200 ease-out text-neutral-100 hover:text-primary">{CurrentUser?.data.email}</span>
                                }
                            </div>
                        </CardContent>
                    </div>
                </div>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Sign Out</CardTitle>
                    <CardDescription>Sign out of your account on this browser</CardDescription>
                </CardHeader>
                <CardContent>
                    {token && (
                        <Button variant={"link"} className="p-0 text-lg" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default AccountPage;