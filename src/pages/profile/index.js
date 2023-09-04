import React, { useState } from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { useAuth } from '../../hooks/auth';
import { ImCancelCircle } from "react-icons/im";
import RenderAvatar from '../../components/Avatar';
import { Link } from 'react-router-dom';
import { AUTH } from '../../lib/routes';



export default function Profile() {
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggle = () => {
    setToggleModal(!toggleModal);
  };

const { user, isDataLoading } = useAuth();
if (isDataLoading) return 'Loading...';


  return (
    <div className='w-full p-8'>
      <div className='bg-gray-05 p-16 rounded-[8px] flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <RenderAvatar user={user} size={"192"} />
          <div className='w-[40%]'>
            <h1 className='text-small text-head'>Username</h1>
            <Link to={`${AUTH}/profile/${user.id}`}>
              <p className='text-h5 font-normal text-gray-75 mb-4 hover:underline'>@{user.username}</p>
            </Link>
            <h1 className='text-small text-head'>Bio</h1>
            {user.bio == '' ? (
              <p className='text-small italic'>Update your bio!</p>
            ): (
              <p className='text-para text-gray-75'>{user.bio}</p>
            )}
          </div>
        </div>

        <div>
          <button onClick={handleToggle} className='flex items-center whitespace-nowrap hover:bg-base mb-4 text-base hover:text-white rounded-[64px] pt-2 pb-2 ease-in duration-300'>
            <span className='ml-8 mr-4'>
              <BsPencilSquare className='text-h5' /> 
            </span>
            <p className='text-h5 font-body font-normal mr-8'>Update profile</p>
          </button>

          {toggleModal && (
            <main className='absolute top-0 left-0 w-full h-full backdrop-blur-[3px] bg-opacity-20 bg-white flex items-center justify-center'>
              <section className='bg-white w-[40vw] h-[80%] shadow-lg p-4'>
                <button onClick={handleToggle} className='flex items-center gap-2 text-para ml-auto pt-1 pb-1 pr-4 pl-4 border rounded-[64px]'>
                  <ImCancelCircle />Cancel
                </button> 
                <div>
                  <input type="text" />
                  <button>Edit</button>
                </div>
              </section>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
