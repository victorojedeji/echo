import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AUTH } from "../lib/routes";

export default function RenderAvatar({ user, size }) {
  const [randomColor, setRandomColor] = useState("");

  useEffect(() => {
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(randomColor);
  }, []);

  if (!user || !size) return 'Loading...';

  if (user?.avatar) {
    return (
      <Link to={`${AUTH}/profile/${user?.id}`}>
        <img
          src={user.avatar}
          alt="profile-pic"
          className={`w-${size} h-${size} rounded-full cursor-pointer hover:opacity-70`}
        />
      </Link>
    );
  } else {
    const avatarStyle = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: randomColor,
    };

    function textSize(size) {
      if (size > 64) {
        return "text-h2";
      } else {
        return "text-h5";
      }
    } 

    const name = user?.username || '';

    return (
      <Link to={`${AUTH}/profile/${user?.id}`} className="cursor-pointer hover:opacity-70`">
        <div style={avatarStyle}>
          <span className={`text-4xl text-white ${textSize(size)}`}>{name.charAt(0).toUpperCase()}</span>
        </div>
      </Link>
    );
  }
}
