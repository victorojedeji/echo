import React, { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useAuth } from "../../hooks/auth";
import { ImCancelCircle } from "react-icons/im";
import RenderAvatar from "../../components/Avatar";
import { Link, useParams } from "react-router-dom";
import { AUTH } from "../../lib/routes";
import PostsList from "../../components/PostsList";
import { usePosts, useUserLikesCount } from "../../hooks/posts";
import { useUpdateAvatar, useUser } from "../../hooks/users";
import { format } from "date-fns";
import TextareaAutosize from "react-textarea-autosize";


export default function Profile() {
  const { id } = useParams();
  const { posts, postsLoading } = usePosts(id);
  const {likesCount, likeCountLoading} = useUserLikesCount(id);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { user, isLoading } = useUser(id);
  const [toggleModal, setToggleModal] = useState(false);
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id); 


  const updateFiles = () => {
    updateAvatar();
  }

  const handleToggle = () => {
    setToggleModal(!toggleModal);
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };  

  // console.log(likesCount)

  if (isLoading) return "Loading...";

  return (
    <div className="w-full p-8">
      <h1 className="text-h5 text-gray-600 font-head font-medium mb-8">
        Profile
      </h1>
      <div className="bg-gray-05 p-16 rounded-[8px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <RenderAvatar user={user} size={"192"}  />
          <div className="w-[40%]">
            <h1 className="text-small text-head">Username</h1>
            <Link to={`${AUTH}/profile/${user.id}`}>
              <p className="text-h5 font-normal text-gray-75 mb-4 hover:underline">
                @{user.username}
              </p>
            </Link>
            <h1 className="text-small text-head">Bio</h1>
            {(authUser.id !== user.id) && user.bio == "" ? <p className="text-small italic">Nothing to see here!</p>
              : (authUser.id === user.id) && user.bio == "" ? (
                <p className="text-small italic">Update your bio!</p>
              ) : (
                <p className="text-para text-gray-75">{user.bio}</p>
              )
            }
            
            
          </div>
        </div>

        <div>
          {!authLoading && (authUser.id === user.id) && (
            <button
              onClick={handleToggle}
              className="flex items-center whitespace-nowrap hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-2 ease-in duration-300"
            >
              <span className="ml-8 mr-4">
                <BsPencilSquare className="text-h5" />
              </span>
              <p className="text-h5 font-body font-normal mr-8">Update profile</p>
            </button>
          )}

          {toggleModal && (
            <main className="z-50 fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-opacity-20 bg-white flex items-center justify-center">
              <section className="bg-white w-[40vw] shadow-xl px-4 pt-8 pb-8 rounded-[8px]">
                <div className="flex items-center mb-8 border-b-2 pb-4">
                  <h1 className="text-h5 font-head">Edit profile</h1>
                  <button
                    onClick={handleToggle}
                    className="flex items-center gap-2 text-para ml-auto pt-1 pb-1 pr-4 pl-4 border rounded-[64px] bg-red-600 text-white"
                  >
                    <ImCancelCircle />
                    Cancel
                  </button>
                </div>
                <div>
                  <div className="flex items-center justify-around mt-8">
                    <RenderAvatar user={user} overrideAvatar={fileURL} size={128} />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImage}
                      />
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-8 h-8 text-gray-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <p className="mt-1 text-sm text-gray-400">
                          Choose an image
                        </p>
                      </div>
                    </label>
                    {fileLoading 
                    ? <button className="bg-base rounded-[64px] pr-8 pl-8 pt-2 pb-2 text-white whitespace-nowrap" onClick={updateFiles}>
                      Processing...
                    </button>
                    : <button className="bg-base rounded-[64px] pr-8 pl-8 pt-2 pb-2 text-white whitespace-nowrap" onClick={updateFiles}>Upload</button>
                     }
                  </div>

                  <div className="flex items-center justify-between mt-8 gap-8">
                    <input
                      type="text"
                      className="flex-1 border-2 rounded-[8px] py-1 px-4 outline-none"
                      placeholder="New Username..."
                    />
                    <button className="rounded-[64px] pr-8 pl-8 pt-2 pb-2 bg-base text-white whitespace-nowrap">
                      Change Username
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-8 gap-8">
                    <TextareaAutosize
                      placeholder="Something about yourself!"
                      className="resize-none p-4 w-[100%] min-h-24 border-2 text-lg font-normal text-gray-600 focus:outline-none rounded-[8px]"
                      required
                      // value={text}
                      // onChange={(e) => {
                      //   setText(e.target.value);
                      // }}
                    />
                    <button className="rounded-[64px] pr-8 pl-8 pt-2 pb-2 bg-base text-white whitespace-nowrap">
                      Update Bio
                    </button>
                  </div>

                    
                  {/* <div className="flex items-center justify-center mt-16">
                
                  </div> */}
                </div>
              </section>
            </main>
          )}
        </div>
      </div>

      <div className="border-b-2 p-4 flex items-center justify-around">
        <h1 className="text-small text-gray-75">{posts?.length} Posts</h1>
        <h1 className="text-small text-gray-75">{likesCount?.length} Likes</h1>
        <h1 className="text-small text-gray-75">
          Joined: {format(user.date, "MMMM YYY")}
        </h1>
      </div>

      {postsLoading ? (
        <div className="text-center text-small italic pt-2 pb-2">
          Posts are loading...
        </div>
      ) : (
        <PostsList posts={posts} />
      )}
    </div>
  );
}
