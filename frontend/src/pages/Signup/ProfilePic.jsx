import React from 'react'

export default function ProfilePic({profilePic, selectedProfilePic, setSelectedProfilePic}) {
  return (
    <div
      className={`profile-pic ${
        selectedProfilePic === profilePic ? "selected" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => setSelectedProfilePic(profilePic)}
      >
        <img
          src={`${window.location.origin}/assets/avatars/${profilePic}`}
          alt={profilePic}
        />
      </button>
    </div>
  );
}
