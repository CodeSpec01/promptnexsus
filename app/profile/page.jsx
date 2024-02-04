'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([])

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (session?.user.id) fetchPosts();

  },[])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const userConfirmation = confirm('Are you sure you want to delete this prompt ?');

    if (userConfirmation) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, { method: 'DELETE' });

        const filteredPost = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPost);

      } catch (error) {
        console.log('Error while deleting post', error);
      }
    }
  };

  return (
    <>
      {session?.user.id ? (
        <Profile
          name='My'
          desc='Welcome to your personalized profile page'
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isUser={true}
          username={session?.user.name}
          email={session?.user.email}
        />
      ) : (
        <div className="w-full">
          <h1 className="head_text text-center blue_gradient font-satoshi">
            Please Login to see your Profile
          </h1>
        </div>
      )}
    </>
  )
}

export default MyProfile
