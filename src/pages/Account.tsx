import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AccountPageProps {

}

const AccountPage: FC<AccountPageProps> = () => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('spotifyAuthToken'));
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash;
        console.log('ProfilePage: URL hash:', hash);

        const params = new URLSearchParams(hash.substring(1));
        const urlToken = params.get('access_token');
        console.log('ProfilePage: Extracted Token:', urlToken);

        if (urlToken) {
            localStorage.setItem('spotifyAuthToken', urlToken);
            setToken(urlToken);
            console.log('ProfilePage: save to local storage');
            window.history.replaceState({}, document.title, "/profile");
        }
    }, [navigate]);

    useEffect(() => {
        if (!token) {
            console.log('ProfilePage: token null');
            navigate('/');
        }
    }, [token, navigate]);

    const handleLogout = () => {
        console.log('ProfilePage: Log Out...');
        localStorage.removeItem('spotifyAuthToken');
        navigate('/');
    };
    return (
        <div className="flex flex-col gap-8">
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