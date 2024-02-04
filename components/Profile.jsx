import { useRouter } from "next/navigation"
import PromptCard from "./PromptCard"
import Image from "next/image";

const Profile = ({ name, desc, data, handleEdit, handleDelete, isUser, username, email, image }) => {

  const router = useRouter();
  const handledeleteUser = () => {
    router.push('/profile/delete')
  }

  return (
    <section className="w-full">
      <h1 className="head_text text-left blue_gradient">{name} Profile</h1>

      <p className="desc text-left">
        {desc}
      </p>

      {isUser && (
        <div className="flex-center flex-col gap-4 mt-10 bg-purple-300/30 py-20 rounded-lg backdrop-blur-3xl">
          <Image
            src={image}
            alt='user image'
            width={60}
            height={60}
            className="rounded-full object-contain"
          />

          <div className="flex-center gap-2">
            <h4 className="text-3xl font-bold font-satoshi">Username:</h4>
            <span className='font-bold text-2xl font-satoshi blue_gradient'>{username}</span>
          </div>

          <div className="flex-center gap-2">
            <h4 className="text-3xl font-bold font-satoshi">Email:</h4>
            <span className='font-bold text-2xl font-satoshi blue_gradient'>{email}</span>
          </div>

          <div onClick={handledeleteUser} className="pt-4">
            <h6 className="text-xl text-white bg-violet-600/90 rounded-full px-3 pb-0.5 cursor-pointer border-2 border-violet-600 transition-all duration-150 hover:bg-transparent hover:text-black hover:border-purple-600">Delete Account</h6>
          </div>

        </div>
      )}

      <h1 className="head_text text-left blue_gradient">{name} Prompts</h1>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEdit && (() => handleEdit(post))}
            handleDelete={handleDelete && (() => handleDelete(post))}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile
