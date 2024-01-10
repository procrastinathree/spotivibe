import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AccountPageProps {

}

const AccountPage: FC<AccountPageProps> = () => {
    const [token, setToken] = useState<string | null>(Cookies.get('spotifyAuthToken') || "");
    const { toast } = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        console.log('ProfilePage: URL hash:', hash);

        const params = new URLSearchParams(hash.substring(1));
        const urlToken = params.get('access_token');
        console.log('ProfilePage: Extracted Token:', urlToken);

        if (urlToken) {
            Cookies.set('spotifyAuthToken', urlToken);
            setToken(urlToken);
            console.log('ProfilePage: save to local storage');
            window.history.replaceState({}, document.title, "/profile");
        }
    }, [navigate]);

    const { data: CurrentUser, error: CurrentUserError } = useQuery({
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
        Cookies.remove('spotifyAuthToken');
        navigate('/');
    };
    return (
        <div className="flex flex-col gap-8">
            <Card className="overflow-hidden">
                <div className="flex">
                    <div className="p-4 bg-primary">
                        <img src={CurrentUser?.data.images[1].url} className="rounded-lg w-52" alt="" />
                    </div>
                    <div className="flex flex-col">
                        <CardHeader>
                            <CardTitle>Spotify Account</CardTitle>
                            <CardDescription>The Spotify account that your're signed in with</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <CardDescription>Username</CardDescription>
                                <a href={CurrentUser?.data.external_urls.spotify} target="_blank" className="text-base font-bold duration-200 ease-out text-neutral-100 hover:text-primary">{CurrentUser?.data.id}</a>
                            </div>
                            <div className="flex flex-col gap-2">
                                <CardDescription>Email</CardDescription>
                                <span className="text-base font-bold duration-200 ease-out text-neutral-100 hover:text-primary">{CurrentUser?.data.email}</span>
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