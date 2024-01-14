'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";

const UserProfile = ({ params }) => {

    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const [userPosts, setUserPosts] = useState([]);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {

        const fetchPosts = async () => {

            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUserPosts(data);

        };

        if (params.id) fetchPosts();

    }, [params.id])

    useEffect(() => {
        if (session?.user.id === params.id) router.push('/profile')
    })

    return (

        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            data={userPosts}
            isUser={false}
        />

    )

}

export default UserProfile;