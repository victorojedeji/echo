import React from "react";

export default function ChatAvatar({ user, size, overrideAvatar = null }) {
  if (!user || !size) return "Loading...";
  if (user?.avatar) {
    const imgStyle = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "100%",
    };
    return (
      <img
        src={overrideAvatar || user.avatar}
        alt="profile-pic"
        style={imgStyle}
        // className={`w-[${size}px] h-[${size}px] rounded-full cursor-pointer hover:opacity-70`}
      />
    );
  } else {
    const avatarStyle = {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: user?.bgColor,
    };

    function textSize(size) {
      if (size > 100) {
        return "text-h2";
      } else {
        return "text-h5";
      }
    }

    const name = user?.username || "";

    return (
      <div style={avatarStyle}>
        <span className={`text-4xl text-white ${textSize(size)}`}>
          {name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }
}
